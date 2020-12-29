import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface SettingsState {
  darkMode: boolean | null;
}

export const initialSettingsState: SettingsState = {
  darkMode: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettingsState,
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<boolean>) => ({
      ...state,
      darkMode: action.payload,
    }),
  },
});

// Actions
export const { toggleDarkMode } = settingsSlice.actions;

// Selectors
export const getDarkMode = (state: RootState) => state.settings.darkMode;

// Reducer
export const settingsReducer = settingsSlice.reducer;

export default settingsSlice;
