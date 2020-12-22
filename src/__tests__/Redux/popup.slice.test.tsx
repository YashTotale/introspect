import { sampleState } from "./store.helpers";
import {
  getPopupOpen,
  getPopupType,
  togglePopup,
  popupReducer,
  PopupState,
  setPopupType,
} from "../../Redux/popup.slice";

describe("Popup actions", () => {
  it("setPopupType action", () => {
    const actual = popupReducer(sampleState.popup, setPopupType("login"));
    const expected: PopupState = {
      ...sampleState.popup,
      type: "login",
    };

    expect(actual).toEqual(expected);
  });
  it("togglePopup action w/ no payload", () => {
    const actual = popupReducer(sampleState.popup, togglePopup());
    const expected: PopupState = {
      ...sampleState.popup,
      open: !sampleState.popup.open,
    };

    expect(actual).toEqual(expected);
  });
  it("togglePopup action w/ boolean payload", () => {
    const actual = popupReducer(sampleState.popup, togglePopup(true));
    const expected: PopupState = {
      ...sampleState.popup,
      open: true,
    };

    expect(actual).toEqual(expected);
  });
  it("togglePopup action w/ full payload", () => {
    const actual = popupReducer(
      sampleState.popup,
      togglePopup({ open: true, type: "login" })
    );
    const expected: PopupState = {
      type: "login",
      open: true,
    };

    expect(actual).toEqual(expected);
  });
});

describe("Popup selectors", () => {
  it("getPopupOpen selector", () => {
    const actual = getPopupOpen(sampleState);
    const expected = sampleState.popup.open;

    expect(actual).toEqual(expected);
  });
  it("getPopupType selector", () => {
    const actual = getPopupType(sampleState);
    const expected = sampleState.popup.type;

    expect(actual).toEqual(expected);
  });
});
