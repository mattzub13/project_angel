import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import { Icon } from 'leaflet';
// Arreglo para un problema común con los íconos por defecto de Leaflet en React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
const DefaultIcon = new Icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
// Este es un pequeño componente interno que maneja los clics en el mapa
function LocationMarker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    // El hook 'useMapEvents' es la magia de react-leaflet. Escucha eventos del mapa.
    const map = useMapEvents({
        click(e) {
            // Cuando el usuario hace clic, actualizamos la posición del marcador
            setPosition(e.latlng);
            // Y llamamos a la función que nos pasó el componente padre con las coordenadas
            onLocationSelect(e.latlng.lat, e.latlng.lng);
            map.flyTo(e.latlng, map.getZoom()); // Opcional: Centra el mapa en el clic
        },
    });
    return position === null ? null : (
        <Marker position={position} icon={DefaultIcon}>
            <Popup>Has seleccionado esta ubicación.</Popup>
        </Marker>
    );
}
// El componente principal del mapa que exportaremos
interface InteractiveMapProps {
    onLocationSelect: (lat: number, lng: number) => void;
}
export const MapPicker = ({ onLocationSelect }: InteractiveMapProps) => {
    // Coordenadas de Santa Cruz de la Sierra para centrar el mapa inicialmente
    const initialPosition: LatLngExpression = [-17.7833, -63.1821];
    return (
        // MapContainer crea el mapa. Le damos un alto fijo o no se verá.
        <MapContainer center={initialPosition} zoom={13} style={{ height: '400px', width: '100%' }} className="rounded-xl">
            {/* TileLayer es la capa que muestra las calles, edificios, etc. Usamos OpenStreetMap que es gratis. */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Aquí llamamos a nuestro componente que maneja los clics */}
            <LocationMarker onLocationSelect={onLocationSelect} />
        </MapContainer>
    );
};