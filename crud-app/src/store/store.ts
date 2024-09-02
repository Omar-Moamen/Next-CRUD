import { combineReducers, configureStore } from "@reduxjs/toolkit";
import
{
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import auth from "./auth/authSlice";
import products from './products/productsSlice';



//! There is a better method for persistConfig
// const rootPersistConfig = {
//    key: "root",
//    storage,
//    whitelist: ["auth"],
// }

const authPersistConfig = {
   key: "auth",
   storage,
   whitelist: ["user", "token"],
}

const rootReducer = combineReducers({
   products,
   auth: persistReducer(authPersistConfig, auth),
})

const makeConfiguredStore = () =>
{
   return (
      configureStore({
         reducer: {
            auth,
            products,
         }
      })
   )
}

const makeStore = () =>
{
   const isServer = typeof window === 'undefined';

   if (isServer)
   {
      return makeConfiguredStore()
   };

   return (
      configureStore({
         reducer: rootReducer,
         middleware: (getDefaultMiddleware) => (
            getDefaultMiddleware({
               serializableCheck: {
                  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
               }
            }))
      })
   )
}

const store = makeStore();

export const persistor = persistStore(store);


// Infer the `RootState` and `AppDispatch` // Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default store;