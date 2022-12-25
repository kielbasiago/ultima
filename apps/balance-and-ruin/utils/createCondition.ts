import {
  Objective,
  ObjectiveCondition,
  RawObjectiveCondition,
  RawObjectiveResult,
} from "~/types/objectives";

export const createCondition = ({
  condition_type_name,
  id,
  range,
  value_descriptions,
  value_range,
}: RawObjectiveCondition) => {
  return {
    id: id.toString(),
    name: condition_type_name,
    range,
    values: [],
  } as ObjectiveCondition;
};
