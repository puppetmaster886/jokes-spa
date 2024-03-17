import { configureStore } from "@reduxjs/toolkit";
import { jokesApi } from "./services/jokesApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import cardReducer from "./features/cardSlice";

export const store = configureStore({
  reducer: {
    [jokesApi.reducerPath]: jokesApi.reducer,
    cardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jokesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
