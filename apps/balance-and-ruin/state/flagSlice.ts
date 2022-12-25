import { useMemo } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { useSelector } from "react-redux";
import { flagsToData } from "~/utils/flagsToData";

type FlagValue = string | number | string[] | number[] | boolean | null;
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
// const initialState: FlagState = {
//   flagValues,
//   rawFlags: valuesToString(flagValues),
// };

// const startingFlags = `-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.2.9.9.4.12.12 -oc 30.8.8.1.1.11.8 -sc1 random -sc2 random -sc3 random -sal -eu -csrp 80 125 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 20 30 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 98989898989898989898989898 -rec1 28 -rec2 27 -rec3 29 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2 -hmced 2 -xgced 2 -ase 2 -msl 40 -sed -bbs -be -bnu -res -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 1 5 -ebr 68 -emprp 75 125 -nm1 random -rnl1 -nm2 random -rnl2 -nmmi -gp 5000 -smc 3 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sisr 20 -sprp 75 125 -sdm 4 -npi -snbr -ccsr 20 -cms -cor -crr -crvr 50 60 -crm -ari -anca -adeh -nmc -nfps -nu -fs -fe -fvd -fr -fj -fbs -fedc -as -ond -rr -etn -frw`;
const startingFlags = `-cg  -oc 30.8.8.1.1.11.8 `;
const initialState: FlagState = {
  flagValues: flagsToData(startingFlags),
  rawFlags: startingFlags,
};

export const EMPTY_FLAG_VALUE = "-ff6wc-empty-value";

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
    setRawFlags: (state, action: PayloadAction<string>) => {
      state.rawFlags = action.payload;
      state.flagValues = flagsToData(action.payload);
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

export const { setFlag, setFlags, setRawFlags } = flagSlice.actions;

export const selectFlagValues = (state: AppState) => state.flag.flagValues;
export const selectFlagValue =
  <T>(flag: string | null) =>
  (state: AppState) => {
    if (!flag || flag === EMPTY_FLAG_VALUE) {
      return null;
    }
    return state.flag.flagValues[flag] as unknown as T;
  };

export const selectRawFlags = (state: AppState) => {
  return state.flag.rawFlags;
};

export const useFlagValueSelector = <T>(flag: string | null) => {
  const flagValueSelector = useMemo(
    () => selectFlagValue<T | null>(flag),
    [flag]
  );
  return useSelector(flagValueSelector);
};

/**
 *
 * @param flags
 * @returns
 */
export const selectActiveMutuallyExclusiveFlag =
  (...flags: string[]) =>
  (state: AppState) => {
    return flags.find((flag) => {
      const val = state.flag.flagValues[flag];
      return val != null;
    });
  };

export default flagSlice.reducer;
