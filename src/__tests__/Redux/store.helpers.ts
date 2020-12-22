import { RootState } from "../../Redux";

// @ts-expect-error
export const sampleState: RootState = {
  today: {
    description: "Test description",
    lastDescription: "Last description",
    rating: 4,
    lastRating: null,
    reflection: "Test reflection",
    lastReflection: "Last reflection",
    done: false,
  },
  popup: {
    open: false,
    type: "logout",
  },
};
