import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface SettingsState {
  darkMode: boolean | null;
  prefix: {
    description: string;
    reflection: string;
  };
}

export const initialSettingsState: SettingsState = {
  darkMode: null,
  prefix: {
    description: "Today was... ",
    reflection: "Reflections: ",
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettingsState,
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<boolean>) => ({
      ...state,
      darkMode: action.payload,
    }),
    setPrefix: (
      state,
      action: PayloadAction<Partial<SettingsState["prefix"]>>
    ) => ({
      ...state,
      prefix: {
        ...state.prefix,
        ...action.payload,
      },
    }),
  },
});

// Actions
export const { toggleDarkMode, setPrefix } = settingsSlice.actions;

// Selectors
export const getDarkMode = (state: RootState) => state.settings.darkMode;
export const getPrefix = (type: keyof SettingsState["prefix"]) => (
  state: RootState
) => state.settings.prefix[type];

// Reducer
export const settingsReducer = settingsSlice.reducer;

export default settingsSlice;
