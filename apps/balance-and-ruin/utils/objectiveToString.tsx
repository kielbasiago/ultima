import { Objective, RawObjectiveResult } from "~/types/objectives";
import last from "lodash/last";

export const objectiveToString = (
  objective: Objective,
  metadata: RawObjectiveResult
) => {
  const { value_range } = metadata;
  const { conditions, result, requiredConditions } = objective;
  const hasRange = Boolean(value_range);
  const conditionString = conditions.length
    ? conditions
        .map((c) => {
          return `${c.id}.${c.values.join(".")}`;
        })
        .join(".")
    : "";

  const resultValue = objective.result.value;
  const [min, max] = resultValue ? resultValue : [];
  const hasValue = Number.isFinite(min) && Number.isFinite(max);
  const values = [
    result.id,
    hasRange ? (hasValue ? min : value_range[0]) : null,
    hasRange ? (hasValue ? max : last(value_range)) : null,
  ].filter((z) => z != null);

  return [values.join("."), requiredConditions.join("."), conditionString]
    .filter((val) => val != null)
    .join(".");
};
