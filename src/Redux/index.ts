export { useAppDispatch, getState } from "./Store";
export type { AppDispatch } from "./Store";

/**
 * Today Slice
 */

// -> Slice
export { default as todaySlice } from "./today.slice";

// -> Selectors
export { getRating, getDescription, getReflection } from "./today.slice";

// -> Actions
export {
  setRating,
  clearRating,
  setDescription,
  clearDescription,
  setReflection,
  clearReflection,
} from "./today.slice";

// -> Reducer
export { todayReducer } from "./today.slice";

// -> State
export type { TodayState } from "./today.slice";

/**
 * Snackbar Slice
 */

// -> Slice
export { default as snackbarSlice } from "./snackbar.slice";

// -> Selectors
export {
  getSnackbarMessage,
  getSnackbarSeverity,
  getSnackbarType,
  getSnackbarOpen,
  getSnackbarUndo,
} from "./snackbar.slice";

// -> Actions
export { setSnackbar, toggleSnackbar } from "./snackbar.slice";

// -> Reducer
export { snackbarReducer } from "./snackbar.slice";

// -> State
export type { SnackbarState } from "./snackbar.slice";
