import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./Store";
import { Color } from "@material-ui/lab";
import { clearDescription, clearRating, clearReflection } from "./today.slice";

export interface SnackbarState {
  message: string;
  severity: Color | "undo";
  type: "rating" | "description" | "reflection";
}

const initialState: SnackbarState = {
  message: "",
  severity: "info",
  type: "rating",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(clearRating, (state) => ({
      ...state,
      message: "Rating cleared",
      severity: "undo",
      type: "rating",
    }));
    builder.addCase(clearDescription, (state) => ({
      ...state,
      message: "Description cleared",
      severity: "undo",
      type: "description",
    }));
    builder.addCase(clearReflection, (state) => ({
      ...state,
      message: "Reflections cleared",
      severity: "undo",
      type: "reflection",
    }));
  },
  reducers: {
    setSnackbar: (state, action: PayloadAction<SnackbarState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

// Actions
export const { setSnackbar } = snackbarSlice.actions;

// Selectors
export const getMessage = (state: RootState) => state.snackbar.message;
export const getSeverity = (state: RootState) => state.snackbar.severity;

// Reducer
export const snackbarReducer = snackbarSlice.reducer;

export default snackbarSlice;
