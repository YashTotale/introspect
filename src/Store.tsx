// React Imports
import React, { FC } from "react";
import Page from "./Components/Loading/Page";

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
import { firebaseConfig } from "./Utils/config";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
  firebaseReducer,
  ReactReduxFirebaseProvider,
  FirebaseReducer,
  FirestoreReducer,
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
import { todayReducer, TodayState } from "./Redux/today.slice";
import { popupReducer, PopupState } from "./Redux/popup.slice";

export interface StoreSchema {}

export interface Profile {}

interface State {
  today: TodayState;
  popup: PopupState;
  firebase: FirebaseReducer.Reducer<Profile, StoreSchema>;
  firestore: FirestoreReducer.Reducer;
}

const reducers = combineReducers<State>({
  today: todayReducer,
  popup: popupReducer,
  firebase: firebaseReducer,
  //@ts-ignore
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
          updateProfileOnLogin: true,
          autoPopulateProfile: true,
        }}
        createFirestoreInstance={createFirestoreInstance}
      >
        <PersistGate loading={<Page />} persistor={persistor}>
          {children}
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default ReduxStore;
