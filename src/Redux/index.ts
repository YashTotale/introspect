export { useAppDispatch, getState } from "./Store";
export type { AppDispatch } from "./Store";

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

/**
 * Firebase
 */

export { getProfile, getUser } from "./firebase.selectors";
