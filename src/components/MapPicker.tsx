import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { type LatLngExpression, Icon } from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Dropdown } from "primereact/dropdown";

const DefaultIcon = new Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const UserLocationIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#007bff" width="48px" height="48px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5-2.5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
    ),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function ChangeView({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function LocationMarker({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>Ubicación seleccionada.</Popup>
    </Marker>
  );
}

export interface Place {
  id: string;
  nombre: string;
  categoria: string;
  lat: number;
  lng: number;
}

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  center: LatLngExpression;
  userLocation: LatLngExpression | null;
  places?: Place[];
}

const mapOptions = [
  { label: "OpenStreetMap", value: "osm" },
  { label: "Google Maps", value: "google" },
];

const getTileLayerUrl = (mapType: string) => {
  switch (mapType) {
    case "google":
      return "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
    case "osm":
    default:
      return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  }
};

export const MapPicker = ({
  onLocationSelect,
  center,
  userLocation,
  places = [],
}: MapPickerProps) => {
  const [selectedMap, setSelectedMap] = useState("osm");

  return (
    <div className="space-y-4">
      {/* Map Type Selector */}
      <div className="flex justify-end">
        <Dropdown
          value={selectedMap}
          options={mapOptions}
          onChange={(e) => setSelectedMap(e.value)}
          placeholder="Seleccionar mapa"
          className="w-48"
        />
      </div>
      
      {/* Map Container */}
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        className="rounded-xl"
        key={selectedMap} // Force re-render when map type changes
      >
        <ChangeView center={center} zoom={13} />
        <TileLayer url={getTileLayerUrl(selectedMap)} />
        <LocationMarker onLocationSelect={onLocationSelect} />

        {userLocation && (
          <Marker position={userLocation} icon={UserLocationIcon}>
            <Popup>¡Estás aquí wachin!</Popup>
          </Marker>
        )}

        {places.map((place) => (
          <Marker key={place.id} position={[place.lat, place.lng]} icon={DefaultIcon}>
            <Popup>
              <b>{place.nombre}</b><br />
              {place.categoria}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
