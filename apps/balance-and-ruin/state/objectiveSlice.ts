export const slice = {};
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";
// import { FlagValue } from "~/state/schemaSlice";
// import { AppState } from "./store";

// type Condition = {
//   condition_type_name: string;
//   range: boolean;
//   value_descriptions: string[];
//   value_range: FlagValue[] | null;
// };
// type Objectives = {
//   id: number;
//   name: string;
//   value_range: null | string[];
//   format_string: string;
// };
// export type ObjectiveMetadataPayload = {
//   conditions: Condition[];
//   objectives: Objective[];
// };
// export type ObjectiveMetadata = {};

// export type Objective = Record<string, ObjectiveMetadata>;

// export interface ObjectiveState {
//   /** Objective created from a generated backend json. Generates item for every flag  */
//   objectives: Objective;
// }

// const objective = {};
// const initialState: ObjectiveState = {
//   objectives: objective,
// };

// // Actual Slice
// export const objectiveSlice = createSlice({
//   name: "objective",
//   initialState,
//   reducers: {
//     setObjective: (
//       state,
//       action: PayloadAction<Record<string, ObjectiveMetadata>>
//     ) => {
//       Object.values(action.payload).forEach((item) => {
//         const allowedValues = item.allowed_values || [];
//         let step: number = item.options?.step ?? 0;
//         if (!step && allowedValues) {
//           const interpreted = (allowedValues as number[]).find(
//             (val) => val % 1
//           );
//           step = interpreted ? interpreted % 1 : 1;
//         }
//         // const step = item.options?.step ??  % 1
//         state.objectives[item.flag] = {
//           allowedValues: item.allowed_values || [],
//           defaultValue: item.default ?? null,
//           description: item.description ?? null,
//           flag: item.flag,
//           label: item.label ?? null,
//           max: item.options?.max_val ?? null,
//           min: item.options?.min_val ?? null,
//           step,
//         };
//       });
//     },
//   },
//   // Special reducer for hydrating the state. Special case for next-redux-wrapper
//   extraReducers: {
//     [HYDRATE]: (state, action) => {
//       return {
//         ...state,
//         ...action.payload.objective,
//       };
//     },
//   },
// });

// export const { setObjective, setOverride } = objectiveSlice.actions;

// export const objectiveSelector =
//   <TKey extends keyof FlagMetadataNode>(flag: string, key: TKey) =>
//   (state: AppState): FlagMetadataNode[TKey] => {
//     const objective = state.objective.objective[flag];
//     const overrides = state.objective.overrides[flag];
//     return overrides?.[key] ?? objective?.[key] ?? null;
//   };
// export const selectAllowedValues = (flag: string) =>
//   objectiveSelector(flag, "allowedValues");
// export const selectDefaultValue = (flag: string) =>
//   objectiveSelector(flag, "defaultValue");
// export const selectDescription = (flag: string) =>
//   objectiveSelector(flag, "description");
// export const selectLabel = (flag: string) => objectiveSelector(flag, "label");
// export const selectMax = (flag: string) => objectiveSelector(flag, "max");
// export const selectMin = (flag: string) => objectiveSelector(flag, "min");
// export const selectStep = (flag: string) => objectiveSelector(flag, "step");

// export default objectiveSlice.reducer;
