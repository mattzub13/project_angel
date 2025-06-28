import { useState } from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { motion } from "framer-motion";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Knob } from "primereact/knob";
import InvestorForm from "./InvestorForm";
import { MapPicker } from "../components/MapPicker";
import { fadeInFromBottom, staggerContainer } from "../utils/animatios";

export interface Pyme {
  id: string;
  nombre: string;
  categoria: string;
  rating: number;
  amount: number;
  descripcionCorta: string;
  necesidad: string;
}

const PymeCard = ({ pyme }: { pyme: Pyme }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeInFromBottom} className="h-full">
      <motion.div
        className="p-6 rounded-2xl h-full flex flex-col bg-light_sky shadow-lg hover:shadow-xl"
        whileHover={{ y: -8 }}
      >
        <div className="flex-grow">
          <Tag
            value={pyme.categoria}
            className="bg-blue_green text-white font-bold"
          />
          <h3 className="text-2xl font-bold my-3 text-blue_green-200">
            {pyme.nombre}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{pyme.descripcionCorta}</p>
          <p className="font-semibold text-blue_green">{pyme.necesidad}</p>
        </div>
        <div className="mt-6 pt-4 border-t border-light_blue-600/20 flex items-center justify-between">
          <div className="flex flex-col items-center">
            <Knob
              value={pyme.rating}
              size={60}
              max={100}
              readOnly
              strokeWidth={8}
              valueColor={`hsl(${pyme.rating}, 80%, 50%)`}
              rangeColor="#e0e0e0"
            />
            <span className="text-xs font-bold text-secondary mt-1">
              Rating
            </span>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              label="Invertir Ahora"
              icon="pi pi-bolt"
              iconPos="right"
              className="bg-nyanza text-blue_green-100 font-bold border-none rounded-lg py-3 px-5 shadow-md hover:brightness-105"
              onClick={() => setOpen(true)}
            />
          </motion.div>
        </div>
      </motion.div>
      <Dialog
        header={`Invertir en ${pyme.nombre}`}
        visible={open}
        onHide={() => setOpen(false)}
        style={{ width: "90vw", maxWidth: "600px" }}
      >
        <InvestorForm pyme={pyme} onFormSubmit={() => setOpen(false)} />
      </Dialog>
    </motion.div>
  );
};

const OpportunitiesDashboard = () => {
  const [pymes] = useState<Pyme[]>([
    {
      id: "pyme-123",
      nombre: 'Salteñería "El Prado"',
      categoria: "Restaurante",
      rating: 85,
      descripcionCorta: "Las salteñeras más queridas...",
      necesidad: "Buscan $1,500...",
      amount: 1500,
    },
    {
      id: "pyme-456",
      nombre: 'Café "El Rincón Lector"',
      categoria: "Cafetería",
      rating: 78,
      descripcionCorta: "Un espacio acogedor...",
      necesidad: "Necesitan $800...",
      amount: 800,
    },
    {
      id: "pyme-789",
      nombre: 'Taller "El Rayo Veloz"',
      categoria: "Servicios",
      rating: 91,
      descripcionCorta: "Mecánica de confianza...",
      necesidad: "Inversión de $2,500...",
      amount: 2500,
    },
  ]);

  const initialCoords: [number, number] = [-17.7833, -63.1821];
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>(initialCoords);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const handleGeolocate = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLatitude(pos.coords.latitude.toFixed(6));
      setLongitude(pos.coords.longitude.toFixed(6));
      setMapCenter([pos.coords.latitude, pos.coords.longitude]);
      setUserLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  };

  return (
    <div className="p-4 sm:p-8 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-blue_green-100">
          Oportunidades de Inversión
        </h1>
        <p className="text-lg text-secondary mt-2">
          Busca en el mapa o explora nuestro catálogo.
        </p>
      </div>
      <div className="max-w-5xl mx-auto mb-16 p-6 bg-nyanza rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-secondary">
          Busca por Ubicación
        </h2>
        <MapPicker
          center={mapCenter}
          userLocation={userLocation}
          onLocationSelect={(lat, lng) => {
            setLatitude(lat.toFixed(6));
            setLongitude(lng.toFixed(6));
            setMapCenter([lat, lng]);
            setUserLocation(null);
          }}
        />
        <div className="flex items-center gap-4 mt-4">
          <InputText
            value={latitude}
            placeholder="Latitud"
            disabled
            className="flex-1"
          />
          <InputText
            value={longitude}
            placeholder="Longitud"
            disabled
            className="flex-1"
          />
          <Button
            icon="pi pi-map-marker"
            onClick={handleGeolocate}
            tooltip="Usar mi ubicación"
            className="p-button-outlined"
          />
        </div>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {pymes.map((pyme) => (
          <PymeCard key={pyme.id} pyme={pyme} />
        ))}
      </motion.div>
    </div>
  );
};

export default OpportunitiesDashboard;
