import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

import { RootState, AppThunk } from "./index";

export type TodayDataType = "rating" | "description" | "reflection";

export interface TodayState {
  current: {
    rating: number | null; // Null for no rating
    description: string;
    reflection: string;
  };
  last: {
    rating: number | null;
    description: string;
    reflection: string;
  };
  saved: {
    rating: number | null;
    description: string;
    reflection: string;
  };
  isSaved: boolean | null | string; // Null for loading state & String for error
}

export const initialTodayState: TodayState = {
  current: {
    rating: null,
    description: "",
    reflection: "",
  },
  last: {
    rating: null,
    description: "",
    reflection: "",
  },
  saved: {
    rating: null,
    description: "",
    reflection: "",
  },
  isSaved: false,
};

const todaySlice = createSlice({
  name: "today",
  initialState: initialTodayState,
  reducers: {
    setTodayData: (
      state,
      action: PayloadAction<Partial<typeof initialTodayState["current"]>>
    ) => ({
      ...state,
      current: {
        ...state.current,
        ...action.payload,
      },
    }),
    clearTodayData: (state, action: PayloadAction<TodayDataType>) => {
      const { payload } = action;
      return {
        ...state,
        current: {
          ...state.current,
          [payload]: initialTodayState.current[payload],
        },
        last: {
          ...state.last,
          [payload]: state.current[payload],
        },
      };
    },
    undoTodayData: (state, action: PayloadAction<TodayDataType>) => {
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
      isSaved: null,
    }),
    saveDataSuccess: (state) => ({
      ...state,
      saved: state.current,
      isSaved: true,
    }),
    saveDataFailure: (state, action: PayloadAction<string>) => ({
      ...state,
      isSaved: action.payload,
    }),
    resetSave: (state) => ({
      ...state,
      isSaved: null,
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
  resetSave,
} = todaySlice.actions;

// Selectors
export const getRating = (state: RootState) => state.today.current.rating;
export const getDescription = (state: RootState) =>
  state.today.current.description;
export const getReflection = (state: RootState) =>
  state.today.current.reflection;
export const getTodaySaved = (state: RootState) => state.today.isSaved;
export const getTodayData = (state: RootState) => state.today.current;

// Reducer
export const todayReducer = todaySlice.reducer;

export default todaySlice;
