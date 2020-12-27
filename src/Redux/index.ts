import moment from "moment";
import { createSelector } from "@reduxjs/toolkit";
import { RootState, Responses } from "../Store";

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
  getTodayData,
  getSavedError,
  getSavedLoading,
  getSavedNotified,
  // -> Actions
  setTodayData,
  clearTodayData,
  undoTodayData,
  saveNotified,
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
export const getResponses = (state: RootState) =>
  state.firebase.profile.responses;
export const getProfileLoaded = (state: RootState) =>
  state.firebase.profile.isLoaded;

export const getSavedTodayData = createSelector(getResponses, (responses) => {
  if (responses) return responses[moment().format("DD-MM-YYYY")];
  return null;
});
export const getSortedResponses = createSelector(getResponses, (responses) => {
  if (!responses) return responses;
  return Object.keys(responses)
    .sort(
      (a, b) =>
        parseInt(moment(a, "DD-MM-YYYY").format("x")) -
        parseInt(moment(b, "DD-MM-YYYY").format("x"))
    )
    .reduce((obj, key) => {
      obj[key] = responses[key];
      return obj;
    }, {} as Responses);
});
