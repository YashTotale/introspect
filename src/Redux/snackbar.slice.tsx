import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./Store";
import { Color } from "@material-ui/lab";
import {
  clearDescription,
  clearRating,
  clearReflection,
  getDescription,
} from "./today.slice";

export interface SnackbarState {
  message: string;
  severity: Color;
  type: "rating" | "description" | "reflection" | null;
  open: boolean;
  withUndo: boolean;
}

const initialState: SnackbarState = {
  message: "",
  severity: "info",
  type: null,
  open: false,
  withUndo: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(clearRating, (state) => ({
      ...state,
      message: "Rating cleared",
      severity: "success",
      type: "rating",
      open: true,
      withUndo: true,
    }));
    builder.addCase(clearDescription, (state) => ({
      ...state,
      message: "Description cleared",
      severity: "success",
      type: "description",
      open: true,
      withUndo: true,
    }));
    builder.addCase(clearReflection, (state) => ({
      ...state,
      message: "Reflections cleared",
      severity: "success",
      type: "reflection",
      open: true,
      withUndo: true,
    }));
  },
  reducers: {
    setSnackbar: (state, action: PayloadAction<Partial<SnackbarState>>) => ({
      ...state,
      type: null,
      withUndo: false,
      ...action.payload,
      open: true,
    }),
    toggleSnackbar: (state, action: PayloadAction<boolean | undefined>) => ({
      ...state,
      open: action.payload ?? !state.open,
    }),
  },
});

// Actions
export const { setSnackbar, toggleSnackbar } = snackbarSlice.actions;

// Selectors
export const getSnackbarMessage = (state: RootState) => state.snackbar.message;
export const getSnackbarSeverity = (state: RootState) =>
  state.snackbar.severity;
export const getSnackbarType = (state: RootState) => state.snackbar.type;
export const getSnackbarOpen = (state: RootState) => state.snackbar.open;
export const getSnackbarUndo = (state: RootState) => state.snackbar.withUndo;

// Reducer
export const snackbarReducer = snackbarSlice.reducer;

export default snackbarSlice;
