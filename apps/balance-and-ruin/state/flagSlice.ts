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

const startingFlags = `-cg -oa 2.2.2.2.6.6.4.9.9 -ob 3.1.1.8.12.12 -oc 30.3.3.1.1.11.8 -od 58.1.1.12.9 -oe 58.1.1.12.9 -of 58.1.1.12.9 -og 48.5.5.0.0 -oh 47.5.5.0.0 -sc1 setzer -sc2 random -sc3 random -sal -eu -csrp 65 140 -fst -brl -slr 3 5 -lmprp 75 125 -lel -srr 25 35 -rnl -rnc -sdr 1 2 -das -dda -dns -sch -com 99999999999999999915999999 -rec1 28 -xpm 3 -mpm 5 -gpm 5 -nxppd -lsced 2.5 -hmced 2.5 -xgced 2 -asr 2 -msl 50 -sed -bbr -be -bnu -rer 0 -fer 0 -escr 100 -dgne -wnz -mmnu -cmd -esr 0 5 -ebr 82 -emprv 1 128 -eer 6 12 -nm1 random -rnl1 -rns1 -nm2 random -rnl2 -rns2 -nmmi -gp 5000 -smc 3 -sto 1 -ieor 33 -ieror 33 -csb 3 14 -mca -stra -saw -sirt -sprv 0 65535 -sdm 5 -npi -snbr -snsb -ccrs -cms -cor -crr -crvr 120 120 -crm -ari -anca -adeh -nmc -nu -nfps -fs -fe -fvd -fr -fj -fbs -fedc -move as -ond -rr -etn -frw`;
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
    return flags.find((flag) => Boolean(state.flag.flagValues[flag])) ?? null;
  };

export default flagSlice.reducer;
