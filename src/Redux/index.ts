import { RootState } from "../Store";

export type {
  RootState,
  AppDispatch,
  AppThunk,
  Profile,
  StoreSchema,
} from "../Store";
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
  getTodaySaved,
  getTodayData,
  // -> Actions
  setTodayData,
  clearTodayData,
  undoTodayData,
  // -> Thunks
  saveTodayData,
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
