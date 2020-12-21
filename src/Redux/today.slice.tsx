import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";

const todaySlice = createSlice({
  name: "today",
  initialState: {
    rating: 0,
    description: "",
    reflection: "",
  },
  reducers: {
    setRating: (state, action) => (state.rating = action.payload),
    setDescription: (state, action) => (state.description = action.payload),
    setReflection: (state, action) => (state.reflection = action.payload),
  },
});

//Actions
export const { setDescription, setRating, setReflection } = todaySlice.actions;

// Selectors
export const getRating = (state: RootState) => state.today.rating;
export const getDescription = (state: RootState) => state.today.description;
export const getReflection = (state: RootState) => state.today.reflection;

export default todaySlice;
