import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

import { RootState, AppThunk } from "./index";

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

export const saveHomeData = (): AppThunk => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  try {
    dispatch(saveDataInProgress());
    const firebase = getFirebase();
    await firebase.updateProfile({
      responses: {
        [moment().format("DD-MM-YYYY")]: getHomeData(getState()),
      },
    });
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
export const getSavedLoading = (state: RootState) => state.home.saved.loading;
export const getSavedNotified = (state: RootState) => state.home.saved.notified;
export const getSavedError = (state: RootState) => state.home.saved.error;

// Reducer
export const homeReducer = homeSlice.reducer;

export default homeSlice;
