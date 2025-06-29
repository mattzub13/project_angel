import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./locationSlice";
import { locationApi } from "./locationApi";

export const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(locationApi.middleware),
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
