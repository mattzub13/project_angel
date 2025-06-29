import { useState } from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { motion } from "framer-motion";
import { Dialog } from "primereact/dialog";
import { Knob } from "primereact/knob";
import InvestorForm from "./InvestorForm";
import { MapPicker } from "../components/MapPicker";
import { fadeInFromBottom, staggerContainer } from "../utils/animatios";
import { useDispatch } from "react-redux";
import { changeLocation, type LocationState } from "../services/locationSlice";
import type { AppDispatch } from "../services/store";
//import { useGetPlaces } from "../services/useGetPlaces";
import { FlipWords } from "../components/FlipWords";

export interface Pyme {
  id: string;
  nombre: string;
  categoria: string;
  rating: number;
  //amount: number;
  descripcionCorta: string;
  necesidad: string;
}

const PymeCard = ({ pyme }: { pyme: Pyme }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeInFromBottom} className="h-full">
      <motion.div
        className="p-6 rounded-2xl h-full flex flex-col bg-space_cadet shadow-lg hover:shadow-xl"
        whileHover={{ y: -8 }}
      >
        <div className="flex-grow">
          <Tag
            value={pyme.categoria}
            className="bg-verdigris text-white font-bold"
          />
          <h3 className="text-2xl font-bold my-3 text-white">{pyme.nombre}</h3>
          <p className="text-white text-sm mb-4">{pyme.descripcionCorta}</p>
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
              label="Conoce Más"
              icon="pi pi-bolt"
              iconPos="right"
              className="bg-cream text-blue_green-100 font-bold border-none rounded-lg py-3 px-5 shadow-md hover:brightness-105"
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
      id: "pyme-101",
      nombre: 'Salteñería "El Cristo"',
      categoria: "Restaurante",
      rating: 92,
      descripcionCorta: "Las famosas salteñas jugosas cerca del monumento, un clásico de los domingos.",
      necesidad: "Renovación del letrero luminoso y compra de 2 hornos semi-industriales.",
     // amount: 2200,
    },
    {
      id: "pyme-202",
      nombre: 'Majadito "El Camba"',
      categoria: "Restaurante",
      rating: 88,
      descripcionCorta: "El auténtico sabor del majao de charque, batido y tostado, como hecho en casa.",
      necesidad: "Adquisición de una moto para iniciar servicio de delivery en la zona norte.",
      //amount: 950,
    },
    {
      id: "pyme-303",
      nombre: "Café de la Siesta - Equipetrol",
      categoria: "Cafetería",
      rating: 85,
      descripcionCorta: "Café de especialidad de los Yungas y masitas típicas en el corazón del barrio.",
      necesidad: "Compra de una máquina de espresso de dos grupos y mobiliario para la terraza.",
      //amount: 3500,
    },
    {
      id: "pyme-404",
      nombre: "Helados 'Maná' - Doble vía la guardia",
      categoria: "Heladería",
      rating: 95,
      descripcionCorta: "Helados de pura fruta de temporada: achachairú, guayabera, manga y más.",
      necesidad: "Compra de un nuevo congelador de exhibición para ampliar la oferta de sabores.",
      //amount: 1800,
    },
    {
      id: "pyme-505",
      nombre: "InnovaSoft Camba",
      categoria: "Tecnología",
      rating: 98,
      descripcionCorta: "Pequeña consultora de software creando sistemas de punto de venta para PYMES.",
      necesidad: "Capital para el lanzamiento de su nueva app de gestión de inventario 'MiTienda'.",
     // amount: 5000,
    },
    {
      id: "pyme-606",
      nombre: "Artesanías 'Manos de Chiquitos'",
      categoria: "Retail",
      rating: 82,
      descripcionCorta: "Hamacas, tallados en madera y tejidos únicos de la región chiquitana.",
      necesidad: "Fondos para comprar materia prima y participar en la FEXPOCRUZ.",
      //amount: 700,
    },
    {
      id: "pyme-707",
      nombre: "Lava-Autos 'El Chubi'",
      categoria: "Servicios",
      rating: 86,
      descripcionCorta: "Servicio de limpieza detallado para vehículos. ¡Tu auto queda chubi-dubí!",
      necesidad: "Instalación de un sistema de reciclaje de agua para ser más ecológicos.",
      //amount: 2800,
    },
    {
      id: "pyme-808",
      nombre: "Biomarket Urubó",
      categoria: "Salud",
      rating: 90,
      descripcionCorta: "Mercado de productos orgánicos, sin gluten y veganos en la zona del Urubó.",
      necesidad: "Importación de una nueva línea de suplementos y vitaminas de EEUU.",
      //amount: 4500,
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
  const dispatch = useDispatch<AppDispatch>();
  //const { data } = useGetPlaces();
  const handleSearch = () => {
    if (latitude == "" || longitude == "") {
      return;
    }
    const data: LocationState = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    };
    dispatch(changeLocation(data));
  };
  const words = ["Apoyo", "Legado", "Ascenso", "Sostenibilidad"];

  return (
    <div className="p-4 sm:p-8 bg-white">
      <div className="text-center mb-3">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl  sm:text-4xl md:text-5xl "
        >
          Oportunidad para obtener
          <br className="hidden sm:inline" />
          <FlipWords
            words={words}
            className="text-space_cadet md:mt-4 font-semibold"
            duration={2500}
          />
        </motion.h1>
        <p className="text-lg text-secondary mt-2">
          Busca en el mapa o explora nuestro catálogo.
        </p>
      </div>
      <div className="max-w-5xl mx-auto mb-16 p-6 bg-space_cadet rounded-2xl shadow-lg">
        <h2 className="text-2xl text-white font-bold mb-4 text-secondary">
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
        <div className="flex items-center gap-4 ">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSearch}
              label="Buscar"
              className="py-3 bg-cream px-5 my-4"
            />
          </motion.div>
         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleGeolocate}
              icon="pi pi-map-marker"
              label="Usa tu ubicación"
              className="py-3 bg-cream px-5 my-4"
            />
          </motion.div>
        </div>
        <div className="flex flex-col justify-center items-center"></div>
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
