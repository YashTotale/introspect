import { RootState } from "../../Redux";

// @ts-expect-error Not added firebase/firestore sample state
export const sampleState: RootState = {
  today: {
    current: {
      rating: 4,
      description: "Test description",
      reflection: "Test reflection",
    },
    last: {
      rating: 4,
      description: "Last description",
      reflection: "Last reflection",
    },
    saved: {
      rating: 4,
      description: "Saved description",
      reflection: "Saved reflection",
    },
    isSaved: null,
    isSaveNotified: false,
  },
  popup: {
    open: false,
    type: "logout",
  },
};
