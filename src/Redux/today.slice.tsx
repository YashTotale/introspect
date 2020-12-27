import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import isEqual from "lodash.isequal";

import { RootState, AppThunk } from "./index";

export type TodayDataType = "rating" | "description" | "reflection";

export interface TodayData {
  rating: number | null; // Null for no rating
  description: string;
  reflection: string;
}
export interface TodayState {
  current: TodayData;
  last: TodayData;
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

export const initialTodayState: TodayState = {
  current: initialData,
  last: initialData,
  saved: {
    loading: false,
    error: null,
    notified: true,
  },
};

const todaySlice = createSlice({
  name: "today",
  initialState: initialTodayState,
  reducers: {
    setTodayData: (
      state,
      action: PayloadAction<Partial<typeof initialTodayState["current"]>>
    ) => {
      const newCurrent = {
        ...state.current,
        ...action.payload,
      };
      return {
        ...state,
        current: newCurrent,
        isSaved: isEqual(state.saved, newCurrent),
      };
    },
    clearTodayData: (state, action: PayloadAction<TodayDataType>) => {
      const { payload } = action;
      const newCurrent = {
        ...state.current,
        [payload]: initialTodayState.current[payload],
      };
      return {
        ...state,
        current: newCurrent,
        last: {
          ...state.last,
          [payload]: state.current[payload],
        },
        isSaved: isEqual(state.saved, newCurrent),
      };
    },
    undoTodayData: (state, action: PayloadAction<TodayDataType>) => {
      const { payload } = action;
      const newCurrent = {
        ...state.current,
        [payload]: state.last[payload],
      };
      return {
        ...state,
        current: newCurrent,
        isSaved: isEqual(state.saved, newCurrent),
      };
    },
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
      saved: initialTodayState.saved,
    }),
  },
});

// Thunks

export const saveTodayData = (): AppThunk => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  try {
    dispatch(saveDataInProgress());
    const firebase = getFirebase();
    await firebase.updateProfile({
      responses: {
        [moment().format("DD-MM-YYYY")]: getTodayData(getState()),
      },
    });
    dispatch(saveDataSuccess());
  } catch (err) {
    dispatch(saveDataFailure(err.toString()));
  }
};

// Actions
export const {
  setTodayData,
  clearTodayData,
  undoTodayData,
  // Save
  saveDataInProgress,
  saveDataSuccess,
  saveDataFailure,
  saveNotified,
} = todaySlice.actions;

// Selectors
export const getRating = (state: RootState) => state.today.current.rating;
export const getDescription = (state: RootState) =>
  state.today.current.description;
export const getReflection = (state: RootState) =>
  state.today.current.reflection;
export const getTodayData = (state: RootState) => state.today.current;
export const getSavedLoading = (state: RootState) => state.today.saved.loading;
export const getSavedNotified = (state: RootState) =>
  state.today.saved.notified;
export const getSavedError = (state: RootState) => state.today.saved.error;

// Reducer
export const todayReducer = todaySlice.reducer;

export default todaySlice;
