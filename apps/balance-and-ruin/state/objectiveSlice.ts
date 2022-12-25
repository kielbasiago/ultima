import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import last from "lodash/last";
import {
  Objective,
  ObjectiveCondition,
  ObjectiveMetadata,
  ObjectiveResult,
  RawObjectiveCondition,
  RawObjectiveResult,
} from "~/types/objectives";
import { objectivesToData } from "~/utils/flagsToData";
import { objectiveToString } from "~/utils/objectiveToString";

/*
   Objective String:
    0.2.2.2.7.7.4.10.10

    resultId.conditionMin.conditionMax.conditonOneId.conditionOneValue1.conditionValue2.conditionTwoValue1.conditionTwoValue2, etc.
 */

// Type for our state
export interface ObjectiveState {
  metadata: ObjectiveMetadata;

  metadataById: {
    conditions: Record<string | number, RawObjectiveCondition>;
    results: Record<string | number, RawObjectiveResult>;
  };
  objectives: Objective[];
  objectivesByFlag: Record<string, Objective>;
}

// Initial state
const initialState: ObjectiveState = {
  metadata: {
    conditions: [],
    objectives: [],
  },
  metadataById: {
    conditions: {},
    results: {},
  },
  objectives: [],
  objectivesByFlag: {},
};

export const MAX_OBJECTIVE_COUNT = 24;
export const DEFAULT_OBJECTIVE_VALUE = "0.0.0";

export const alphabet = Array.from(new Array(MAX_OBJECTIVE_COUNT)).map(
  (_, idx) => String.fromCharCode(97 + idx)
);

export const objectiveFlags = alphabet.map((letter) => `-o${letter}`);

type SetObjectivePayload = {
  flag: string;
  value: string;
};

// Actual Slice
export const objectiveSlice = createSlice({
  name: "objective",
  initialState,
  reducers: {
    setObjectiveMetadata(state, action: PayloadAction<ObjectiveMetadata>) {
      const conditionsById = action.payload.conditions.reduce((acc, val) => {
        acc[val.id] = val;
        return acc;
      }, {} as Record<string, RawObjectiveCondition>);

      const resultsById = action.payload.objectives.reduce((acc, val) => {
        acc[val.id] = val;
        return acc;
      }, {} as Record<string, RawObjectiveResult>);

      state.metadata = action.payload;
      state.metadataById = {
        conditions: conditionsById,
        results: resultsById,
      };
    },
    setRawObjectives(state, action: PayloadAction<string>) {
      const objectiveValues = objectivesToData(action.payload);
      state.objectives = Object.entries(objectiveValues).map(
        ([flag, value]) => {
          const values = value.split(".");
          const resultId = values[0];
          const metadata = state.metadataById.results[resultId];
          const hasRange = Boolean(metadata.value_range);

          // result id, condition min/max
          const conditions: ObjectiveCondition[] = [];
          let conditionStart = 3;
          if (hasRange) {
            conditionStart += 2;
          }

          const conditionString = values.slice(conditionStart, values.length);

          let nextConditionIdx = 0;
          conditionString.forEach((val, idx) => {
            if (idx === nextConditionIdx) {
              nextConditionIdx += 2;
              const conditionMetadata = state.metadataById.conditions[val];
              if (!conditionMetadata) {
                return;
              }
              const { id, condition_type_name, range, value_range } =
                conditionMetadata;

              if (range) {
                nextConditionIdx += 2;
              }

              const rawMin = conditionString[idx + 1];
              const rawMax = conditionString[idx + 2];
              const minValNum = Number.parseInt(rawMin);
              const maxValNum = Number.parseInt(rawMax);

              const values = [
                Number.isFinite(minValNum) ? minValNum : rawMin,
                Number.isFinite(maxValNum) ? maxValNum : rawMax,
              ].filter((val) => val != null);

              conditions.push({
                id: id.toString(),
                name: condition_type_name,
                range,
                values,
              });
            }
          });

          const minConditions = Number.parseInt(
            hasRange ? values[3] : values[1]
          );

          const maxConditions = Number.parseInt(
            hasRange ? values[4] : values[2]
          );

          const { group, id, format_string } =
            state.metadata.objectives[Number.parseInt(resultId)];

          const result: ObjectiveResult = {
            group,
            label: format_string,
            id: id.toString(),
            value: hasRange
              ? [Number.parseInt(values[1]), Number.parseInt(values[2])]
              : undefined,
          };

          const objective: Omit<Objective, "value"> = {
            conditions,
            flag,
            letter: `${last(flag)}`,
            requiredConditions: [
              Number.isFinite(minConditions) ? minConditions : 0,
              Number.isFinite(maxConditions) ? maxConditions : 0,
            ],
            result,
          };

          return {
            ...objective,
          } as Objective;
        }
      );
      state.objectivesByFlag = state.objectives.reduce((acc, val) => {
        acc[val.flag] = val;
        return acc;
      }, {} as Record<string, Objective>);
    },
    setResultValue(
      state,
      action: PayloadAction<{ flag: string; value: number[] }>
    ) {
      const objective = {
        ...state.objectives.find(({ flag }) => flag === action.payload.flag),
      } as Objective;

      objective.result.value = action.payload.value as [number, number];
      state.objectivesByFlag[action.payload.flag] = objective;
    },
    addObjective(
      state,
      action: PayloadAction<
        Omit<Objective, "conditions" | "requiredConditions" | "result">
      >
    ) {
      const objectiveCount = state.objectives.length;
      if (objectiveCount >= MAX_OBJECTIVE_COUNT) {
        return;
      }

      const { format_string, group, id } = state.metadata.objectives[0];

      state.objectives.push({
        conditions: [],
        result: {
          group,
          id: id.toString(),
          label: format_string,
        },
        requiredConditions: [0, 0],
        ...action.payload,
      });
    },
    addCondition(state, action: PayloadAction<ObjectiveCondition>) {},
    removeCondition(state, action: PayloadAction<ObjectiveCondition>) {},
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.objective,
      };
    },
  },
});

export const {
  addCondition,
  addObjective,
  removeCondition,
  setObjectiveMetadata,
  setResultValue,
  setRawObjectives,
} = objectiveSlice.actions;

export const selectObjectives = (state: AppState) => state.objective.objectives;
export const selectObjectivesByFlag = (state: AppState) =>
  state.objective.objectivesByFlag;

export const selectObjective = (flag: string) => (state: AppState) =>
  state.objective.objectivesByFlag[flag];

export const selectObjectiveResultMetadata = (state: AppState) =>
  state.objective.metadata.objectives;

export const selectObjectiveResultMetadataById = (state: AppState) =>
  state.objective.metadataById.results;

export const selectObjectiveConditionMetadata = (state: AppState) =>
  state.objective.metadata.conditions;

export const selectObjectiveConditionMetadataById = (state: AppState) =>
  state.objective.metadataById.conditions;

export const selectObjectiveConditions = (id: number) => (state: AppState) =>
  state.objective.objectives[id];

export default objectiveSlice.reducer;
