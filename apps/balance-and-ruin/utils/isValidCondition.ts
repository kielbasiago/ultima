import { ObjectiveCondition } from "~/types/objectives";

export const isValidCondition = (c: ObjectiveCondition) => {
  return Number.parseInt(c.id) > 0;
};
