import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import isEqual from "lodash.isequal";
import moment from "moment";
import { firebaseReducer } from "react-redux-firebase";

import {
  RootState,
  AppThunk,
  getIsHomeDataSaved,
  getSavedHomeData,
  getResponses,
} from "./index";

export type HomeDataType = "rating" | "description" | "reflection";

export interface HomeData {
  rating: number | null; // Null for no rating
  description: string;
  reflection: string;
}
export interface HomeState {
  date: string;
  current: HomeData;
  last: HomeData;
  saved: {
    loading: boolean;
    error: string | null;
    notified: boolean;
  };
}

export const initialData = {
  rating: null,
  description: "",
  reflection: "",
};

export const initialHomeState: HomeState = {
  date: moment().format("DD-MM-YYYY"),
  current: initialData,
  last: initialData,
  saved: {
    loading: false,
    error: null,
    notified: true,
  },
};

const homeSlice = createSlice({
  name: "home",
  initialState: initialHomeState,
  reducers: {
    setHomeData: (
      state,
      action: PayloadAction<Partial<typeof initialHomeState["current"]>>
    ) => ({
      ...state,
      current: {
        ...state.current,
        ...action.payload,
      },
    }),
    clearHomeData: (state, action: PayloadAction<HomeDataType>) => {
      const { payload } = action;
      return {
        ...state,
        current: {
          ...state.current,
          [payload]: initialHomeState.current[payload],
        },
        last: {
          ...state.last,
          [payload]: state.current[payload],
        },
      };
    },
    undoHomeData: (state, action: PayloadAction<HomeDataType>) => {
      const { payload } = action;
      return {
        ...state,
        current: {
          ...state.current,
          [payload]: state.last[payload],
        },
      };
    },
    changeHomeDate: (state, action: PayloadAction<string>) => ({
      ...state,
      date: action.payload,
    }),
    // Save
    saveDataInProgress: (state) => ({
      ...state,
      saved: {
        ...state.saved,
        loading: true,
      },
    }),
    saveDataSuccess: (state) => ({
      ...state,
      saved: {
        ...state.saved,
        notified: false,
        loading: false,
      },
    }),
    saveDataFailure: (state, action: PayloadAction<string>) => ({
      ...state,
      saved: {
        ...state.saved,
        error: action.payload,
        notified: false,
        loading: false,
      },
    }),
    saveNotified: (state) => ({
      ...state,
      saved: initialHomeState.saved,
    }),
  },
});

// Thunks

export const setHomeDate = (date: string): AppThunk => async (
  dispatch,
  getState
) => {
  const isSaved = getIsHomeDataSaved(getState());
  const currentDate = getHomeDate(getState());

  if (!isSaved) dispatch(saveHomeData(currentDate));

  dispatch(changeHomeDate(date));
  dispatch(resetHomeData());
};

export const resetHomeData = (): AppThunk => (dispatch, getState) => {
  const saved = getSavedHomeData(getState());

  dispatch(setHomeData(saved));
};

export const saveHomeData = (date?: string): AppThunk => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  try {
    dispatch(saveDataInProgress());
    const saveDate = date || getHomeDate(getState());
    const responses = getResponses(getState());
    const firebase = getFirebase();
    const data = getHomeData(getState());

    const newResponses = { ...responses, [saveDate]: data };

    if (isEqual(data, initialData)) delete newResponses[saveDate];

    await firebase.updateProfile(
      {
        responses: newResponses,
      },
      {
        merge: false,
      }
    );
    dispatch(saveDataSuccess());
  } catch (err) {
    dispatch(saveDataFailure(err.toString()));
  }
};

// Actions
export const {
  setHomeData,
  clearHomeData,
  undoHomeData,
  changeHomeDate,
  // Save
  saveDataInProgress,
  saveDataSuccess,
  saveDataFailure,
  saveNotified,
} = homeSlice.actions;

// Selectors
export const getRating = (state: RootState) => state.home.current.rating;
export const getDescription = (state: RootState) =>
  state.home.current.description;
export const getReflection = (state: RootState) =>
  state.home.current.reflection;
export const getHomeData = (state: RootState) => state.home.current;
export const getHomeDate = (state: RootState) => state.home.date;
export const getSavedLoading = (state: RootState) => state.home.saved.loading;
export const getSavedNotified = (state: RootState) => state.home.saved.notified;
export const getSavedError = (state: RootState) => state.home.saved.error;

// Reducer
export const homeReducer = homeSlice.reducer;

export default homeSlice;
