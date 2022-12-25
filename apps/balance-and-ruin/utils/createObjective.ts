import { Objective, RawObjectiveResult } from "~/types/objectives";

export const createObjective = (
  old: Objective,
  newMeta: RawObjectiveResult
) => {
  const { name, group, id } = newMeta;

  return {
    conditions: old.conditions,
    flag: old.flag,
    letter: old.letter,
    result: {
      group,
      id: id.toString(),
      label: name,
    },
    requiredConditions: old.requiredConditions,
  } as Objective;
};
