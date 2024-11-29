import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { flagSlice } from "./flagSlice";
import { schemaSlice } from "~/state/schemaSlice";
import { settingsSlice } from "~/state/settingsSlice";
import { objectiveSlice } from "~/state/objectiveSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [flagSlice.name]: flagSlice.reducer,
      [objectiveSlice.name]: objectiveSlice.reducer,
      [schemaSlice.name]: schemaSlice.reducer,
      [settingsSlice.name]: settingsSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
