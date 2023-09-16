import { FlagValue } from "~/state/schemaSlice";

const SPECIAL_FLAG_REGEX = /^-(com|cspr|cpal|cpor|cspp|name|rls)$/;
const OBJECTIVE_REGEX = /^(-o[a-z])$/;

var foo = "-oa 45.-61.45.2.2.2.7.7.4.10.10 -ob 30.8.8.1.1.11.8";
var FLAG_START_REGEX = /-(?=[a-z])/g;

foo.split(FLAG_START_REGEX);

export const flagsToData = (rawFlags: string): Record<string, FlagValue> => {
  const flags = rawFlags
    .split(FLAG_START_REGEX)
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

export const objectivesToData = (rawFlags: string): Record<string, string> => {
  const flags = rawFlags
    .split(FLAG_START_REGEX)
    .filter((flag) => flag)
    .map((flag) => `-${flag.trim()}`);

  return flags.reduce((acc, flagWithValue) => {
    const [key, val1, val2] = flagWithValue.split(" ");
    const isObjective = OBJECTIVE_REGEX.test(key);

    // is number array
    if (!isObjective) {
      return acc;
    }
    acc[key] = val1;
    return acc;
  }, {} as Record<string, string>);
};
