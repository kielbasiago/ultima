import { Button } from "@ff6wc/ui";
import { useDispatch, useSelector } from "react-redux";
import { setFlag, useFlagValueSelector } from "~/state/flagSlice";
import {
  normalizeObjectives,
  normalizeObjectivesArr,
  removeObjective,
  selectObjectiveResultMetadataById,
  selectObjectives,
  setObjectives,
} from "~/state/objectiveSlice";
import { Objective } from "~/types/objectives";
import { objectiveToString } from "~/utils/objectiveToString";

type ObjectiveCardProps = {
  objective: Objective;
};

export const ObjectiveDeleteButton = ({ objective }: ObjectiveCardProps) => {
  const { flag } = objective;
  const dispatch = useDispatch();
  const objectivesByFlag = useSelector(selectObjectives) ?? {};
  const meta = useSelector(selectObjectiveResultMetadataById);

  const deleteObjective = () => {
    const newObjectivesMap = { ...objectivesByFlag };
    delete newObjectivesMap[flag];
    const newObjectives = normalizeObjectives(newObjectivesMap);
    dispatch(setObjectives(newObjectives));

    Object.values(objectivesByFlag).forEach(({ flag }) =>
      dispatch(
        setFlag({
          flag,
          value: null,
        })
      )
    );
    newObjectives.forEach((obj) => {
      dispatch(
        setFlag({
          flag: obj.flag,
          value: objectiveToString(obj, meta[obj.result.id]),
        })
      );
    });
  };

  return (
    <Button onClick={deleteObjective} variant="primary">
      Delete
    </Button>
  );
};
