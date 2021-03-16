import isEqual from "lodash.isequal";
import moment from "moment";
import { createSelector } from "@reduxjs/toolkit";
import Crypto from "crypto-js";

import { RootState, Responses } from "../Store";
import { getHomeDate, getHomeData, initialData } from "./home.slice";
import { getStartDate, getEndDate } from "./statistics.slice";
import { createUnixDate } from "../Utils/funcs";

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
  getPrefix,
  // -> Actions
  toggleDarkMode,
  setPrefix,
  // -> Reducer
  settingsReducer,
  // -> State
  initialSettingsState,
} from "./settings.slice";

export type { SettingsState } from "./settings.slice";

/**
 * Statistics Slice
 */

export {
  // -> Slice
  default as statisticsSlice,
  // -> Selectors
  getStartDate,
  getEndDate,
  // -> Actions
  setStartDate,
  setEndDate,
  // -> Reducer
  statisticsReducer,
  // -> State
  initialStatisticsState,
} from "./statistics.slice";

export type { StatisticsState } from "./statistics.slice";

/**
 * Firebase
 */

export const getUser = (state: RootState) => state.firebase.auth;
export const getProfile = (state: RootState) => state.firebase.profile;

export const getResponses = (state: RootState) => {
  if (!getProfileLoaded(state)) return undefined;

  const responses = state.firebase.profile.responses;
  if (!responses) return responses;

  const user = getUser(state);

  const decrypted = Object.entries(responses).reduce((obj, [key, data]) => {
    return {
      ...obj,
      [key]: {
        ...data,
        description: Crypto.AES.decrypt(data.description, user.uid).toString(
          Crypto.enc.Utf8
        ),
        reflection: Crypto.AES.decrypt(data.reflection, user.uid).toString(
          Crypto.enc.Utf8
        ),
      },
    };
  }, {} as Responses);

  return decrypted;
};

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

export const getSortedResponses = createSelector(
  getResponses,
  getStartDate,
  getEndDate,
  (responses, startDate, endDate) => {
    if (!responses) return responses;
    return Object.keys(responses)
      .filter((date) => {
        const d = moment(date, "DD-MM-YYYY");
        if (
          d.isBefore(moment(startDate, "DD-MM-YYYY")) ||
          d.isAfter(moment(endDate, "DD-MM-YYYY"))
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => createUnixDate(a) - createUnixDate(b))
      .reduce((obj, key) => {
        obj[key] = responses[key];
        return obj;
      }, {} as Responses);
  }
);
