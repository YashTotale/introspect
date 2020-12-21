export { useAppDispatch, getState } from "./Store";
export type { AppDispatch } from "./Store";

/**
 * Today Slice
 */

// -> Slice
export { default as todaySlice } from "./today.slice";

// -> Selectors
export { getRating, getDescription, getReflection } from "./today.slice";

// -> Actions
export {
  setRating,
  undoRating,
  setDescription,
  undoDescription,
  setReflection,
  undoReflection,
} from "./today.slice";

// -> Reducer
export { todayReducer } from "./today.slice";

// -> State
export type { TodayState } from "./today.slice";
