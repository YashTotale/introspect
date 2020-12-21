import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";

const todaySlice = createSlice({
  name: "today",
  initialState: {
    rating: null as number | null,
    description: "",
    reflection: "",
  },
  reducers: {
    setRating: (state, action: PayloadAction<number | null>) => ({
      ...state,
      rating: action.payload,
    }),
    setDescription: (state, action: PayloadAction<string>) => ({
      ...state,
      description: action.payload,
    }),
    setReflection: (state, action: PayloadAction<string>) => ({
      ...state,
      reflection: action.payload,
    }),
  },
});

// Actions
export const { setDescription, setRating, setReflection } = todaySlice.actions;

// Selectors
export const getRating = (state: RootState) => state.today.rating;
export const getDescription = (state: RootState) => state.today.description;
export const getReflection = (state: RootState) => state.today.reflection;

// Reducer
export const todayReducer = todaySlice.reducer;

export default todaySlice;
