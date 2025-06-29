import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
  lat: number | null;
  lng: number | null;
}

const initialState: LocationState = {
  lat: null,
  lng: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {
    changeLocation: (
      state,
      { payload }: PayloadAction<LocationState | null>
    ) => {
      state.lat = payload?.lat ?? 0;
      state.lng = payload?.lng ?? 0;
    },
  },
});

export const { changeLocation } = locationSlice.actions;
export default locationSlice;
