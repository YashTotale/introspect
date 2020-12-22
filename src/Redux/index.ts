import { RootState } from "../Store";

export type { RootState, AppDispatch } from "../Store";
export { useAppDispatch, getState } from "../Store";

/**
 * Today Slice
 */

// -> Slice
export { default as todaySlice } from "./today.slice";

// -> Selectors
export {
  getRating,
  getDescription,
  getReflection,
  getTodayData,
} from "./today.slice";

// -> Actions
export {
  // Rating
  setRating,
  clearRating,
  undoRating,
  // Description
  setDescription,
  clearDescription,
  undoDescription,
  // Reflection
  setReflection,
  clearReflection,
  undoReflection,
} from "./today.slice";

// -> Reducer
export { todayReducer } from "./today.slice";

// -> State
export type { TodayState } from "./today.slice";

/**
 * Popup Slice
 */

// -> Slice
export { default as popupSlice } from "./popup.slice";

// -> Selectors
export { getPopupOpen, getPopupType } from "./popup.slice";

// -> Actions
export { togglePopup, setPopupType } from "./popup.slice";

// -> Reducer
export { popupReducer } from "./popup.slice";

// -> State
export type { PopupState } from "./popup.slice";

/**
 * Firebase
 */

export const getUser = (state: RootState) => state.firebase.auth;
export const getProfile = (state: RootState) => state.firebase.profile;
