import { Objective } from "~/types/objectives";
import { isValidCondition } from "~/utils/isValidCondition";

export const objectiveToString = (objective: Objective) => {
  const { conditions, result, requiredConditions } = objective;

  const validConditions = conditions.filter(isValidCondition);
  const conditionString = validConditions.length
    ? validConditions
        .map((c) => {
          return `${c.id}.${c.values.join(".")}`;
        })
        .join(".")
    : "";

  const newResultValue = result.value ?? [];

  const values = [result.id, ...newResultValue].filter((z) => z != null);

  const returnValue = [
    values.join("."),
    requiredConditions.join("."),
    conditionString,
  ]
    .filter((val) => val != null && val !== "")
    .join(".");

  console.log("conditions", conditions);
  console.log("result", result);
  console.log("requiredConditions", requiredConditions);
  console.log("validConditions", validConditions);
  console.log("conditionString", conditionString);
  console.log("values", values);
  console.log("returnValue", returnValue);
  return returnValue;
};
