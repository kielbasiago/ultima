import { FlagValue } from "~/state/schemaSlice";

const SPECIAL_FLAG_REGEX = /^-(com|cspr|cpal|cpor|name)$/;
const OBJECTIVE_REGEX = /^(-o[a-z])$/;
export const flagsToData = (rawFlags: string): Record<string, FlagValue> => {
  const flags = rawFlags
    .split("-")
    .filter((flag) => flag)
    .map((flag) => `-${flag.trim()}`);

  return flags.reduce((acc, flagWithValue) => {
    const [key, val1, val2] = flagWithValue.split(" ");
    const isCommands = SPECIAL_FLAG_REGEX.test(key);
    const isObjective = OBJECTIVE_REGEX.test(key);

    // is number array
    if (val1 && val2) {
      const min = Number.parseFloat(val1);
      const max = Number.parseFloat(val2);
      acc[key] = [min, max];
    } else if (isObjective || isCommands) {
      acc[key] = val1;
    } else if (Number.isFinite(Number.parseFloat(val1))) {
      acc[key] = Number.parseFloat(val1);
    } else if (val1) {
      acc[key] = val1;
    } else {
      acc[key] = true;
    }
    return acc;
  }, {} as Record<string, FlagValue>);
};
