import { configureStore } from "@reduxjs/toolkit";
import nextReducer from "./nextSlice";
import authReducer from "./authSlice";
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
import localForage from "localforage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: localForage,
};

const persistedReducer = persistReducer(persistConfig, nextReducer);

export const store = configureStore({
  reducer: {
    next: persistedReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);