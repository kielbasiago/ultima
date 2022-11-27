import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

type FlagData = {
  /**
   * The WC flag used to identify a flag
   * @example
   * `-cg`
   * `-msl`
   */
  flag: string;
  value: string | number | string[] | number[];
};

// Type for our state
export interface FlagState {
  flagValues: Record<string, any>;
}

// Initial state
const initialState: FlagState = {
  flagValues: {
    "-csb": [1, 20],
  },
};

// Actual Slice
export const flagSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    setFlag: (state, action: PayloadAction<FlagData>) => {
      state.flagValues[action.payload.flag] = action.payload.value;
    },
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.flag,
      };
    },
  },
});

export const { setFlag } = flagSlice.actions;

export const selectFlagValues = (state: AppState) => state.flag.flagValues;
export const selectFlagValue =
  <T = unknown>(flag: string) =>
  (state: AppState): T => {
    return state.flag.flagValues[flag];
  };

export default flagSlice.reducer;
