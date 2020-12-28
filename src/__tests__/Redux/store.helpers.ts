import { RootState } from "../../Redux";

// @ts-expect-error Not added firebase/firestore sample state
export const sampleState: RootState = {
  home: {
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
    date: "22-12-2017",
    saved: {
      error: null,
      loading: true,
      notified: false,
    },
  },
  popup: {
    open: false,
    type: "logout",
  },
};
