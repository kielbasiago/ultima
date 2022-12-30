import { Objective } from "~/types/objectives";

export const objectiveToString = (
  objective: Objective,
  value: number[] = []
) => {
  const { conditions, result, requiredConditions } = objective;

  const validConditions = conditions.filter((c) => Number.parseInt(c.id) > 0);
  const conditionString = validConditions.length
    ? validConditions
        .filter((c) => Number.parseInt(c.id) > 0)
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

  console.log("VALUES", values);
  console.log("RETURN VALUE", returnValue);
  return returnValue;
};
