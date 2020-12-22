import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export type PopupType = "login" | "logout";

export interface PopupState {
  open: boolean;
  type: PopupType;
}

const initialState: PopupState = {
  open: false,
  type: "login",
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopup: (
      state,
      action: PayloadAction<PopupState | boolean | undefined>
    ) => {
      if (action.payload === undefined) return { ...state, open: !state.open };
      if (typeof action.payload === "boolean")
        return { ...state, open: action.payload };
      return {
        ...state,
        ...action.payload,
      };
    },
    setPopupType: (state, action: PayloadAction<PopupType>) => ({
      ...state,
      type: action.payload,
    }),
  },
});

// Actions
export const { togglePopup, setPopupType } = popupSlice.actions;

// Selectors
export const getPopupOpen = (state: RootState) => state.popup.open;
export const getPopupType = (state: RootState) => state.popup.type;

// Reducer
export const popupReducer = popupSlice.reducer;

export default popupSlice;
