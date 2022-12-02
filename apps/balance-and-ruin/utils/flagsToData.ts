import { RawFlagMetadata, RawFlagValue } from "~/state/schemaSlice";

export const flagsToData = (rawFlags: string): Record<string, RawFlagValue> => {
  const flags = rawFlags
    .split("-")
    .filter((flag) => flag)
    .map((flag) => `-${flag.trim()}`);

  return flags.reduce((acc, flagWithValue) => {
    const [key, val1, val2] = flagWithValue.split(" ");
    // is number arary
    if (val1 && val2) {
      const min = Number.parseFloat(val1);
      const max = Number.parseFloat(val2);
      acc[key] = [min, max];
    } else if (Number.isFinite(Number.parseFloat(val1))) {
      acc[key] = Number.parseFloat(val1);
    } else if (val1) {
      acc[key] = key;
    } else {
      acc[key] = true;
    }
    return acc;
  }, {} as Record<string, RawFlagValue>);
};
