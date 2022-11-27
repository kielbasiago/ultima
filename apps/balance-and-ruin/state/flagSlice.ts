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
  key: string;
  value: string | number | string[] | number[];
};

// Type for our state
export interface FlagState {
  flagValues: Record<string, any>;
}

// Initial state
const initialState: FlagState = {
  flagValues: {},
};

// Actual Slice
export const flagSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {
    setFlag: (state, action: PayloadAction<FlagData>) => {
      if (Array.isArray(action.payload.value)) {
        state.flagValues[action.payload.key] = `${action.payload.value.join(
          " "
        )}`;
      }
      state.flagValues[action.payload.key] = `${action.payload.value}`;
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

export const {} = flagSlice.actions;

export const selectFlagState = (state: AppState) => state.auth;

export default flagSlice.reducer;
