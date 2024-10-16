"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { type AppStoreWithPersistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStoreWithPersistor>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={storeRef.current.__persistor!}>
        {children}
      </PersistGate>
    </Provider>
  );
}
