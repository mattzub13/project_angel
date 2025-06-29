import { useSelector } from "react-redux";
import type { LocationState } from "./locationSlice";
import { useEffect } from "react";
import { useGetAllPlacesMutation } from "./locationApi";

export const useGetPlaces = () => {
  const { lat, lng } = useSelector((state: { location: LocationState }) => ({
    lat: state.location.lat,
    lng: state.location.lng,
  }));

  const [getAllPlaces, { data, error,isLoading }] = useGetAllPlacesMutation();

  useEffect(() => {
    if (lat && lng) {
      getAllPlaces({ lat, lng });
    }
  }, [lat, lng]);

  useEffect(() => {
    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      console.log(data);
    }
  }, [data, error]);

  return {
    data,
  };
};
