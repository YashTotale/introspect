import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./Store";

export interface TodayState {
  rating: number | null;
  description: string;
  reflection: string;
}

const initialState: TodayState = {
  rating: null,
  description: "",
  reflection: "",
};

const todaySlice = createSlice({
  name: "today",
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<number | null>) => ({
      ...state,
      rating: action.payload,
    }),
    clearRating: (state) => ({
      ...state,
      rating: null,
    }),
    setDescription: (state, action: PayloadAction<string>) => ({
      ...state,
      description: action.payload,
    }),
    clearDescription: (state) => ({
      ...state,
      description: "",
    }),
    setReflection: (state, action: PayloadAction<string>) => ({
      ...state,
      reflection: action.payload,
    }),
    clearReflection: (state) => ({
      ...state,
      reflection: "",
    }),
  },
});

// Actions
export const {
  setRating,
  clearRating,
  setDescription,
  clearDescription,
  setReflection,
  clearReflection,
} = todaySlice.actions;

// Selectors
export const getRating = (state: RootState) => state.today.rating;
export const getDescription = (state: RootState) => state.today.description;
export const getReflection = (state: RootState) => state.today.reflection;

// Reducer
export const todayReducer = todaySlice.reducer;

export default todaySlice;
