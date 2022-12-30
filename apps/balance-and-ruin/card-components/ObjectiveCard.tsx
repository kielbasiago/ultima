import { Button, Card } from "@ff6wc/ui";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleValue } from "react-select";
import { ObjectiveConditionSelect } from "~/components/ObjectiveConditionSelect/ObjectiveConditionSelect";
import { ObjectiveConditionsRequired } from "~/components/ObjectiveConditionsRequired/ObjectiveConditionsRequired";
import { ObjectiveResultSelect } from "~/components/ObjectiveResultSelect/ObjectiveResultSelect";
import { ObjectiveResultValue } from "~/components/ObjectiveResultValue/ObjectiveResultValue";
import { Divider } from "@ff6wc/ui/Divider/Divider";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  addCondition,
  MAX_CONDITION_COUNT,
  removeObjective,
  selectObjectiveResultMetadataById,
  selectObjectives,
  setObjective,
  setResultValue,
} from "~/state/objectiveSlice";
import {
  Objective,
  ObjectiveCondition,
  ObjectiveResult,
} from "~/types/objectives";
import { createObjective } from "~/utils/createObjective";
import { objectiveToString } from "~/utils/objectiveToString";
import { ObjectiveDeleteButton } from "~/components/ObjectiveDeleteButton/ObjectiveDeleteButton";

type ObjectiveCardProps = {
  objective: Objective;
};

export const ObjectiveCard = ({ objective }: ObjectiveCardProps) => {
  const { flag, letter } = objective;
  const dispatch = useDispatch();

  const value = useFlagValueSelector<string>(`-o${letter}`)?.split(".") ?? [];

  const [resultId] = value;
  const metadata = useSelector(selectObjectiveResultMetadataById);

  const resultMetadata = metadata[resultId] ?? {};
  const { value_range } = resultMetadata;

  const clearObjectiveResult = () => {
    return dispatch(
      setFlag({
        flag,
        value: null,
      })
    );
  };

  const onResultChange = (val: SingleValue<ObjectiveResult>) => {
    if (val === null) {
      return clearObjectiveResult();
    }

    const newMetadata = metadata[val.id];
    const newObjective = createObjective(objective, newMetadata);

    const newValue = objectiveToString(newObjective, newMetadata);

    dispatch(
      setFlag({
        flag,
        value: newValue,
      })
    );
  };

  const onValueChange = (value: number[]) => {
    // update objective store
    dispatch(
      setResultValue({
        flag,
        value,
      })
    );

    const newObjective = createObjective(objective, resultMetadata);
    newObjective.result.value = value;
    const newValue = objectiveToString(newObjective, resultMetadata);

    dispatch(
      setFlag({
        flag,
        value: newValue,
      })
    );
  };

  const onObjectiveChange = (obj: Objective) => {
    dispatch(setObjective(obj));
    dispatch(
      setFlag({
        flag: obj.flag,
        value: objectiveToString(obj, resultMetadata),
      })
    );
  };

  const addObjectiveCondition = () => {
    dispatch(
      addCondition({
        flag,
      })
    );

    dispatch(
      setFlag({
        flag,
        value: [...value.concat("1", "r")].join("."),
      })
    );
  };

  const title = (
    <div className={"flex flex-grow items-center justify-between "}>
      <span className="flex items-center gap-4">
        <span>Objective {letter.toUpperCase()}</span>
        <Button
          disabled={objective.conditions.length >= MAX_CONDITION_COUNT}
          onClick={addObjectiveCondition}
          variant="primary"
        >
          Add Condition
        </Button>
      </span>
      <ObjectiveDeleteButton objective={objective} />
    </div>
  );

  return (
    <Card className="" title={title as unknown as any}>
      <ObjectiveResultSelect flag={flag} onChange={onResultChange} />
      {value_range ? (
        <ObjectiveResultValue
          flag={flag}
          metadata={resultMetadata}
          onChange={onValueChange}
        />
      ) : null}
      {objective.conditions.map((c, idx) => (
        <ObjectiveConditionSelect
          condition={c}
          key={idx}
          objective={objective}
          onChange={onObjectiveChange}
        />
      ))}
      <Divider />
      <ObjectiveConditionsRequired
        objective={objective}
        onChange={onObjectiveChange}
      />
    </Card>
  );
};
