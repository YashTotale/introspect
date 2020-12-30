import moment from "moment";
import isEqual from "lodash.isequal";
import { createSelector } from "@reduxjs/toolkit";
import { RootState, Responses, Profile } from "../Store";
import { getHomeDate, getHomeData, initialData } from "./home.slice";

export type {
  RootState,
  Responses,
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
  setHomeDate,
  resetHomeData,
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
 * Settings Slice
 */

export {
  // -> Slice
  default as settingsSlice,
  // -> Selectors
  getDarkMode,
  // -> Actions
  toggleDarkMode,
} from "./settings.slice";

export type {} from "./settings.slice";

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
    if (responses && responses[date]) return responses[date];
    return initialData;
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

export const getSavedSettings = (state: RootState) =>
  state.firebase.profile.settings;
export const getSavedPrefix = (type: keyof Profile["settings"]["prefix"]) =>
  createSelector(getSavedSettings, (settings) => {
    if (settings?.prefix) {
      return settings.prefix[type];
    }
    return type === "description" ? "Today was..." : "Reflections: ";
  });
