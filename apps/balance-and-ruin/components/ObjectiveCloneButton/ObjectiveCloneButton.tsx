import { Button } from "@ff6wc/ui";
import { useDispatch, useSelector } from "react-redux";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  addObjective,
  alphabet,
  MAX_OBJECTIVE_COUNT,
  selectObjectiveResultMetadataById,
  selectObjectives,
} from "~/state/objectiveSlice";
import { Objective } from "~/types/objectives";
import { objectiveToString } from "~/utils/objectiveToString";

type ObjectiveCardProps = {
  objective: Objective;
};

export const ObjectiveCloneButton = ({ objective }: ObjectiveCardProps) => {
  const { flag } = objective;
  const dispatch = useDispatch();
  const objectivesByFlag = useSelector(selectObjectives) ?? {};
  const meta = useSelector(selectObjectiveResultMetadataById);
  const value = useFlagValueSelector<string>(flag)?.split(".") ?? [];
  const objectives = Object.values(useSelector(selectObjectives) ?? {});

  const clone = () => {
    const nextObjectiveId = objectives.length;
    const letter = alphabet[nextObjectiveId];
    const flag = `-o${letter}`;

    const { conditions, requiredConditions, result } = objective;
    const newObjective = {
      flag,
      letter,
      conditions,
      requiredConditions,
      result,
    };
    dispatch(addObjective(newObjective));
    dispatch(
      setFlag({
        flag,
        value: objectiveToString(newObjective),
      })
    );
  };

  return (
    <Button
      disabled={objectives.length >= MAX_OBJECTIVE_COUNT}
      onClick={clone}
      size="small"
      variant="primary"
    >
      Clone Objective
    </Button>
  );
};
