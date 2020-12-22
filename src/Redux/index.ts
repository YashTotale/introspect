import { RootState } from "../Store";

export type { RootState, AppDispatch, Profile, StoreSchema } from "../Store";
export { useAppDispatch, getState } from "../Store";

/**
 * Today Slice
 */

export {
  // -> Slice
  default as todaySlice,
  // -> Selectors
  getRating,
  getDescription,
  getReflection,
  getTodayData,
  // -> Actions
  // -> -> Rating
  setRating,
  clearRating,
  undoRating,
  // -> -> Description
  setDescription,
  clearDescription,
  undoDescription,
  // -> -> Reflection
  setReflection,
  clearReflection,
  undoReflection,
  // -> Reducer
  todayReducer,
  // -> State
  initialTodayState,
} from "./today.slice";

export type { TodayState } from "./today.slice";

/**
 * Popup Slice
 */

export {
  // -> Slice
  default as popupSlice,
  // -> Selectors
  getPopupOpen,
  getPopupType,
  // -> Actions
  togglePopup,
  setPopupType,
  // -> Reducer
  popupReducer,
  // -> State
  initialPopupState,
} from "./popup.slice";

export type { PopupState } from "./popup.slice";

/**
 * Firebase
 */

export const getUser = (state: RootState) => state.firebase.auth;
export const getProfile = (state: RootState) => state.firebase.profile;
