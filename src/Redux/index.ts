import moment from "moment";
import isEqual from "lodash.isequal";
import { createSelector } from "@reduxjs/toolkit";
import { RootState, Responses } from "../Store";
import { getHomeDate, getHomeData } from "./home.slice";

export type {
  RootState,
  AppDispatch,
  AppThunk,
  Profile,
  StoreSchema,
} from "../Store";
export { useAppDispatch, getState } from "../Store";

/**
 * Home Slice
 */

export {
  // -> Slice
  default as homeSlice,
  // -> Selectors
  getRating,
  getDescription,
  getReflection,
  getHomeDate,
  getHomeData,
  getSavedError,
  getSavedLoading,
  getSavedNotified,
  // -> Actions
  setHomeData,
  clearHomeData,
  undoHomeData,
  saveNotified,
  setDate,
  // -> Thunks
  saveHomeData,
  // -> Reducer
  homeReducer,
  // -> State
  initialHomeState,
} from "./home.slice";

export type { HomeState, HomeDataType, HomeData } from "./home.slice";

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

export const getSavedHomeData = createSelector(
  getResponses,
  getHomeDate,
  (responses, date) => {
    if (responses) return responses[date];
    return null;
  }
);
export const getIsHomeDataSaved = createSelector(
  getSavedHomeData,
  getHomeData,
  (saved, current) => isEqual(saved, current)
);

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
