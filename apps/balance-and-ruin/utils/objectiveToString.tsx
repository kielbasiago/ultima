import { Objective } from "~/types/objectives";
import { isValidCondition } from "~/utils/isValidCondition";

export const objectiveToString = (
  objective: Objective,
  value: number[] = []
) => {
  const { conditions, result, requiredConditions } = objective;

  const validConditions = conditions.filter(isValidCondition);
  const conditionString = validConditions.length
    ? validConditions
        .map((c) => {
          return `${c.id}.${c.values.join(".")}`;
        })
        .join(".")
    : "";

  const values = [result.id, ...value].filter((z) => z != null);

  const returnValue = [
    values.join("."),
    requiredConditions.join("."),
    conditionString,
  ]
    .filter((val) => val != null && val !== "")
    .join(".");

  return returnValue;
};
