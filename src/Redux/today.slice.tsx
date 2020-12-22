import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./index";

export interface TodayState {
  rating: number | null;
  lastRating: number | null;
  description: string;
  lastDescription: string;
  reflection: string;
  lastReflection: string;
  done: boolean;
}

const initialState: TodayState = {
  rating: null,
  lastRating: null,
  description: "",
  lastDescription: "",
  reflection: "",
  lastReflection: "",
  done: false,
};

const todaySlice = createSlice({
  name: "today",
  initialState,
  reducers: {
    // Rating
    setRating: (state, action: PayloadAction<number | null>) => ({
      ...state,
      rating: action.payload,
    }),
    clearRating: (state) => ({
      ...state,
      lastRating: state.rating,
      rating: null,
    }),
    undoRating: (state) => ({
      ...state,
      rating: state.lastRating,
    }),
    // Description
    setDescription: (state, action: PayloadAction<string>) => ({
      ...state,
      description: action.payload,
    }),
    clearDescription: (state) => ({
      ...state,
      lastDescription: state.description,
      description: "",
    }),
    undoDescription: (state) => ({
      ...state,
      description: state.lastDescription,
    }),
    // Reflection
    setReflection: (state, action: PayloadAction<string>) => ({
      ...state,
      reflection: action.payload,
    }),
    clearReflection: (state) => ({
      ...state,
      lastReflection: state.reflection,
      reflection: "",
    }),
    undoReflection: (state) => ({
      ...state,
      reflection: state.lastReflection,
    }),
  },
});

// Actions
export const {
  // Ratinf
  setRating,
  clearRating,
  undoRating,
  // Description
  setDescription,
  clearDescription,
  undoDescription,
  // Reflection
  setReflection,
  clearReflection,
  undoReflection,
} = todaySlice.actions;

// Selectors
export const getRating = (state: RootState) => state.today.rating;
export const getDescription = (state: RootState) => state.today.description;
export const getReflection = (state: RootState) => state.today.reflection;
export const getTodayDone = (state: RootState) => state.today.done;
export const getTodayData = createSelector(
  getRating,
  getDescription,
  getReflection,
  (rating, description, reflection) => ({ rating, description, reflection })
);

// Reducer
export const todayReducer = todaySlice.reducer;

export default todaySlice;
