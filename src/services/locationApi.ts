import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getAllPlaces: builder.mutation({
      query: ({ lat, lng }: { lat: number; lng: number }) => ({
        url: `https://backend-hackathon2025-240363371566.us-central1.run.app/api/v1/peques/scrapear-y-buscar?tipo=restaurante&lat=${lat}&lng=${lng}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetAllPlacesMutation } = locationApi;
