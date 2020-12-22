import { sampleState } from "./store.helpers";
import { getPopupOpen, getPopupType } from "../../Redux/popup.slice";

describe("Popup selectors", () => {
  it("getPopupOpen selector", () => {
    const expected = sampleState.popup.open;
    const actual = getPopupOpen(sampleState);

    expect(actual).toEqual(expected);
  });
  it("getPopupType selector", () => {
    const expected = sampleState.popup.type;
    const actual = getPopupType(sampleState);

    expect(actual).toEqual(expected);
  });
});
