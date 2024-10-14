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

import profileReducer, { ProfileState } from "./features/profile";
import globalReducer, { GlobalState } from "./features/global";
import { updateVersion } from "./features/global/actions";
import { useDispatch } from "react-redux";

export interface RootState extends PersistPartial {
  profile: ProfileState;
  global: GlobalState;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

const PERSISTED_KEYS: string[] = ["profile", "global"];
const persistConfig = {
  key: "primary",
  whitelist: PERSISTED_KEYS,
  blacklist: [],
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  profile: profileReducer,
  global: globalReducer,
});

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
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
  });
}
export type AppStoreWithPersistor = AppStore & { __persistor?: Persistor };

let _store: AppStoreWithPersistor | undefined;

export const initializeStore = (): AppStoreWithPersistor => {
  const isServer = typeof window === "undefined";
  if (isServer) return makeStore();

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  _store = configureStore({
    reducer: persistedReducer,
  });

  _store.__persistor = persistStore(_store, null, () => {
    _store!.dispatch(updateVersion());
  });

  return _store;
};

export const store = _store ?? initializeStore();

export const useAppDispatch = () => useDispatch<AppDispatch>();
