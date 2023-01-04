import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

type SettingValue = string | number | string[] | number[] | boolean | null;

// Type for our state
export interface SettingsState {
  settings: {
    /** Show flags that are - only turn on once they are defaulted properly in WorldsCollide */
    showDeprecated: boolean;
    /** TODO: Workshop */
    showWorkshop: boolean;
    /** Hides header, hero image, footer from the view */
    showLayout: boolean;
  };
}

// Initial state
const initialState: SettingsState = {
  settings: {
    showDeprecated: true,
    showWorkshop: false,
    showLayout: false,
  },
};

// Actual Slice
export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    // Action to set the settingsentication status
    setSetting(state, action) {},
  },
  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.settings,
      };
    },
  },
});

export const { setSetting } = settingsSlice.actions;

export const selectSettings = (state: AppState) => state.settings.settings;

export default settingsSlice.reducer;
