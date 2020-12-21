import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./Store";

export interface TodayState {
  rating: number | null;
  lastRating: number | null;
  description: string;
  lastDescription: string;
  reflection: string;
  lastReflection: string;
}

const initialState: TodayState = {
  rating: null,
  lastRating: null,
  description: "",
  lastDescription: "",
  reflection: "",
  lastReflection: "",
};

const todaySlice = createSlice({
  name: "today",
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<number | null>) => ({
      ...state,
      lastRating: state.rating,
      rating: action.payload,
    }),
    undoRating: (state) => ({
      ...state,
      rating: state.lastRating,
    }),
    setDescription: (state, action: PayloadAction<string>) => ({
      ...state,
      lastDescription: state.description,
      description: action.payload,
    }),
    undoDescription: (state) => ({
      ...state,
      description: state.lastDescription,
    }),
    setReflection: (state, action: PayloadAction<string>) => ({
      ...state,
      lastReflection: state.reflection,
      reflection: action.payload,
    }),
    undoReflection: (state) => ({
      ...state,
      reflection: state.lastReflection,
    }),
  },
});

// Actions
export const {
  setRating,
  undoRating,
  setDescription,
  undoDescription,
  setReflection,
  undoReflection,
} = todaySlice.actions;

// Selectors
export const getRating = (state: RootState) => state.today.rating;
export const getDescription = (state: RootState) => state.today.description;
export const getReflection = (state: RootState) => state.today.reflection;

// Reducer
export const todayReducer = todaySlice.reducer;

export default todaySlice;
