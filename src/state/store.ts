import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
  type Persistor,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { type PersistPartial } from "redux-persist/es/persistReducer";

import userReducer from "./features/user";
import globalReducer, { type GlobalState } from "./features/global";
import { updateVersion } from "./features/global/actions";
import { useDispatch } from "react-redux";
import { type UserState } from "./features/user/types";

// Define the state type including PersistPartial
export interface RootState extends PersistPartial {
  user: UserState;
  global: GlobalState;
}

// Define the type for the store
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

// Persist configuration
const PERSISTED_KEYS: string[] = ["user", "global"];
const persistConfig = {
  key: "primary",
  whitelist: PERSISTED_KEYS,
  blacklist: [],
  storage,
  version: 1,
};

// Combine reducers with persistedReducer
const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
});

// Create the store
export function makeStore(preloadedState?: RootState) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: true,
        thunk: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV === "development",
    preloadedState,
  });
}
export type AppStoreWithPersistor = AppStore & { __persistor?: Persistor };

export const initializeStore = (): AppStoreWithPersistor => {
  const isServer = typeof window === "undefined";
  if (isServer) return makeStore();

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store: AppStore & { __persistor?: Persistor } = configureStore({
    reducer: persistedReducer,
  });

  store.__persistor = persistStore(store, null, () => {
    store.dispatch(updateVersion());
  });

  return store;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
