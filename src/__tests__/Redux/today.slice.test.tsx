import { sampleState } from "./store.helpers";
import {
  clearDescription,
  clearRating,
  clearReflection,
  getDescription,
  getRating,
  getReflection,
  getTodayData,
  getTodayDone,
  setDescription,
  setRating,
  setReflection,
  todayReducer,
  TodayState,
  undoDescription,
  undoRating,
  undoReflection,
} from "../../Redux/today.slice";

describe("Today actions", () => {
  it("setRating action", () => {
    const actual = todayReducer(sampleState.today, setRating(3));
    const expected: TodayState = {
      ...sampleState.today,
      rating: 3,
    };

    expect(actual).toEqual(expected);
  });
  it("clearRating action", () => {
    const actual = todayReducer(sampleState.today, clearRating());
    const expected: TodayState = {
      ...sampleState.today,
      lastRating: sampleState.today.rating,
      rating: null,
    };

    expect(actual).toEqual(expected);
  });
  it("undoRating action", () => {
    const actual = todayReducer(sampleState.today, undoRating());
    const expected: TodayState = {
      ...sampleState.today,
      rating: sampleState.today.lastRating,
    };

    expect(actual).toEqual(expected);
  });
  it("setDescription action", () => {
    const newDescription = "Another description";

    const actual = todayReducer(
      sampleState.today,
      setDescription(newDescription)
    );
    const expected: TodayState = {
      ...sampleState.today,
      description: newDescription,
    };

    expect(actual).toEqual(expected);
  });
  it("clearDescription action", () => {
    const actual = todayReducer(sampleState.today, clearDescription());
    const expected: TodayState = {
      ...sampleState.today,
      lastDescription: sampleState.today.description,
      description: "",
    };

    expect(actual).toEqual(expected);
  });
  it("undoDescription action", () => {
    const actual = todayReducer(sampleState.today, undoDescription());
    const expected: TodayState = {
      ...sampleState.today,
      description: sampleState.today.lastDescription,
    };

    expect(actual).toEqual(expected);
  });
  it("setReflection action", () => {
    const newReflection = "Another reflection";

    const actual = todayReducer(
      sampleState.today,
      setReflection(newReflection)
    );
    const expected: TodayState = {
      ...sampleState.today,
      reflection: newReflection,
    };

    expect(actual).toEqual(expected);
  });
  it("clearReflection action", () => {
    const actual = todayReducer(sampleState.today, clearReflection());
    const expected: TodayState = {
      ...sampleState.today,
      lastReflection: sampleState.today.reflection,
      reflection: "",
    };

    expect(actual).toEqual(expected);
  });
  it("undoReflection action", () => {
    const actual = todayReducer(sampleState.today, undoReflection());
    const expected: TodayState = {
      ...sampleState.today,
      reflection: sampleState.today.lastReflection,
    };

    expect(actual).toEqual(expected);
  });
});

describe("Today selectors", () => {
  it("getRating selector", () => {
    const actual = getRating(sampleState);
    const expected = sampleState.today.rating;

    expect(actual).toEqual(expected);
  });
  it("getDescription selector", () => {
    const actual = getDescription(sampleState);
    const expected = sampleState.today.description;

    expect(actual).toEqual(expected);
  });
  it("getReflection selector", () => {
    const actual = getReflection(sampleState);
    const expected = sampleState.today.reflection;

    expect(actual).toEqual(expected);
  });
  it("getTodayDone selector", () => {
    const actual = getTodayDone(sampleState);
    const expected = sampleState.today.done;

    expect(actual).toEqual(expected);
  });
  it("getTodayData selector", () => {
    const actual = getTodayData(sampleState);
    const expected = {
      rating: sampleState.today.rating,
      description: sampleState.today.description,
      reflection: sampleState.today.reflection,
    };

    expect(actual).toEqual(expected);
  });
});
