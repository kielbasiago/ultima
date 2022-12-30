import { Button } from "@ff6wc/ui";
import { useDispatch, useSelector } from "react-redux";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  addCondition,
  MAX_CONDITION_COUNT,
  normalizeObjectives,
  selectObjectiveResultMetadataById,
  selectObjectives,
  setObjectives,
} from "~/state/objectiveSlice";
import { Objective } from "~/types/objectives";
import { objectiveToString } from "~/utils/objectiveToString";

type ObjectiveCardProps = {
  objective: Objective;
};

export const ObjectiveAddConditionButton = ({
  objective,
}: ObjectiveCardProps) => {
  const { flag } = objective;
  const dispatch = useDispatch();
  const objectivesByFlag = useSelector(selectObjectives) ?? {};
  const meta = useSelector(selectObjectiveResultMetadataById);
  const value = useFlagValueSelector<string>(flag)?.split(".") ?? [];

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

  return (
    <Button
      disabled={objective.conditions.length >= MAX_CONDITION_COUNT}
      onClick={addObjectiveCondition}
      variant="primary"
    >
      Add Condition
    </Button>
  );
};
