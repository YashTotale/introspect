import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "../Store";

export interface StatisticsState {
  startDate: string;
  endDate: string;
}

export const initialStatisticsState: StatisticsState = {
  startDate: "01-01-2000",
  endDate: moment().format("DD-MM-YYYY"),
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: initialStatisticsState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => ({
      ...state,
      startDate: action.payload,
    }),
    setEndDate: (state, action: PayloadAction<string>) => ({
      ...state,
      endDate: action.payload,
    }),
  },
});

// Actions
export const { setStartDate, setEndDate } = statisticsSlice.actions;

// Selectors
export const getStartDate = (state: RootState) => state.statistics.startDate;
export const getEndDate = (state: RootState) => state.statistics.endDate;

// Reducer
export const statisticsReducer = statisticsSlice.reducer;

export default statisticsSlice;
