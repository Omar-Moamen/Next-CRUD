'use client'

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import store, { AppStore, persistor } from "@/store/store"
import { useRef } from "react"

const StoreProvider = ({ children }: { children: React.ReactNode }) =>
{
  const storeRef = useRef<AppStore>()
  if (!storeRef.current)
  {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default StoreProvider;
