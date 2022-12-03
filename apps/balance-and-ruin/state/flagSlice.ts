import { useMemo } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { useSelector } from "react-redux";

type FlagValue = string | number | string[] | number[] | boolean;
type FlagData = {
  /**
   * The WC flag used to identify a flag
   * @example
   * `-cg`
   * `-msl`
   */
  flag: string;
  /**
   * The value of the flag - null indicates it hasn't been set or has been cleared
   */
  value: FlagValue | null;
};

// Type for our state
export interface FlagState {
  flagValues: Record<string, FlagValue | null>;
  rawFlags: string;
}

const valuesToString = (flagValues: FlagState["flagValues"]) => {
  return Object.entries(flagValues).reduce((acc, [key, val]) => {
    if (Array.isArray(val)) {
      return `${acc} ${key} ${val.join(" ")}`;
    }
    if (typeof val === "boolean") {
      return val ? `${acc} ${key}` : acc;
    }
    return `${acc} ${key} ${val}`;
  }, "");
};

// Initial state
const flagValues = {};
const initialState: FlagState = {
  flagValues,
  rawFlags: valuesToString(flagValues),
};

// Actual Slice
export const flagSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    setFlag: (state, action: PayloadAction<FlagData>) => {
      // clear value
      if (action.payload.value === null) {
        delete state.flagValues[action.payload.flag];
        state.rawFlags = valuesToString(state.flagValues);
        return;
      }
      state.flagValues[action.payload.flag] = action.payload.value;
      state.rawFlags = valuesToString(state.flagValues);
    },
    setFlags: (state, action: PayloadAction<Record<string, FlagValue>>) => {
      Object.keys(action.payload).forEach((key) => {
        state.flagValues[key] = action.payload.value;
      });

      state.rawFlags = valuesToString(state.flagValues);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.flag,
      };
    },
  },
});

export const { setFlag, setFlags } = flagSlice.actions;

export const selectFlagValues = (state: AppState) => state.flag.flagValues;
export const selectFlagValue =
  <T>(flag: string) =>
  (state: AppState) => {
    return state.flag.flagValues[flag] as unknown as T;
  };

export const selectRawFlags = (state: AppState) => {
  return state.flag.rawFlags;
};

export const useFlagValueSelector = <T>(flag: string) => {
  const flagValueSelector = useMemo(
    () => selectFlagValue<T | null>(flag),
    [flag]
  );
  return useSelector(flagValueSelector);
};

export default flagSlice.reducer;
