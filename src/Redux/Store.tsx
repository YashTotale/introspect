// React Imports
import React, { FC } from "react";

// Redux Imports
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";

// Firebase Imports
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "../Utils/CONFIDENTIAL";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
  firebaseReducer,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import {
  constants as rfConstants,
  createFirestoreInstance,
  firestoreReducer,
} from "redux-firestore";

// Redux Persist Imports
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import storage from "redux-persist/lib/storage";

// Reducer Imports
import { todayReducer } from "./today.slice";

const reducers = combineReducers({
  today: todayReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const extraArgument = {
  getFirebase,
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        // just ignore every redux-firebase and react-redux-firebase action type
        ...Object.keys(rfConstants.actionTypes).map(
          (type) => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map(
          (type) => `@@reactReduxFirebase/${type}`
        ),
      ],
      ignoredPaths: ["firebase", "firestore"],
    },
    thunk: {
      extraArgument,
    },
  }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const getState = store.getState;

export type RootState = ReturnType<typeof store.getState>;

const persistor = persistStore(store);

firebase.initializeApp(firebaseConfig);

firebase.firestore();

const ReduxStore: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        dispatch={store.dispatch}
        firebase={firebase}
        config={{
          logErrors: true,
          useFirestoreForProfile: true,
          userProfile: "users",
        }}
        createFirestoreInstance={createFirestoreInstance}
      >
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default ReduxStore;
