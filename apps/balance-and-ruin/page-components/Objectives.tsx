import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ObjectiveCard } from "~/card-components/ObjectiveCard";
import { Button } from "@ff6wc/ui";
import { selectRawFlags, setFlag } from "~/state/flagSlice";
import {
  addObjective,
  alphabet,
  DEFAULT_OBJECTIVE_VALUE,
  MAX_OBJECTIVE_COUNT,
  selectObjectives,
  setRawObjectives,
} from "~/state/objectiveSlice";

export const Objectives = () => {
  const dispatch = useDispatch();
  const rawFlags = useSelector(selectRawFlags);

  const objectives = Object.values(useSelector(selectObjectives) ?? {});

  useEffect(() => {
    dispatch(setRawObjectives(rawFlags));
  }, [dispatch]);

  const onAddObjective = () => {
    const nextObjectiveId = objectives.length;
    const letter = alphabet[nextObjectiveId];
    const flag = `-o${letter}`;
    dispatch(
      addObjective({
        flag,
        letter,
      })
    );
    dispatch(
      setFlag({
        flag,
        value: DEFAULT_OBJECTIVE_VALUE,
      })
    );
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <div>
        <Button
          disabled={objectives.length >= MAX_OBJECTIVE_COUNT}
          onClick={onAddObjective}
          variant="primary"
        >
          Add Objective
        </Button>
      </div>
      <div className="flex flex-row">
        {objectives.map((objective) => (
          <ObjectiveCard key={objective.flag} objective={objective} />
        ))}
      </div>
    </div>
  );
};
