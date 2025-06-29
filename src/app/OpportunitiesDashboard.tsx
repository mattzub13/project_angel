import { useState } from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { motion } from "framer-motion";
import { Dialog } from "primereact/dialog";
import InvestorForm from "./InvestorForm";
import { MapPicker } from "../components/MapPicker";
import { fadeInFromBottom, staggerContainer } from "../utils/animatios";
import { useDispatch } from "react-redux";
import { changeLocation, type LocationState } from "../services/locationSlice";
import type { AppDispatch } from "../services/store";
//import { useGetPlaces } from "../services/useGetPlaces";
import { FlipWords } from "../components/FlipWords";
import { getPymes, type Pyme } from "../services/mockDataService";
import CategoryIcon from "../components/CategoryIcon";
import type { Place } from "../components/MapPicker";

const PymeCard = ({ pyme }: { pyme: Pyme }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div 
      variants={fadeInFromBottom} 
      className="w-full h-full"
    >
      <motion.div
        className="relative p-6 rounded-2xl h-full min-h-[320px] flex flex-col bg-gradient-to-br from-space_cadet to-space_cadet/90 shadow-lg hover:shadow-2xl transition-all duration-300 border border-verdigris/20 backdrop-blur-sm"
        whileHover={{ 
          y: -8,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-verdigris/5 to-transparent rounded-2xl pointer-events-none" />
        
        <div className="relative z-10 flex-grow flex flex-col">
          {/* Header with Category Icon and Tag */}
          <div className="flex justify-between items-start mb-4">
            <CategoryIcon category={pyme.categoria} className="text-4xl" />
            <Tag
              value={pyme.categoria}
              className="bg-gradient-to-r from-verdigris to-verdigris/80 text-white font-semibold text-xs px-3 py-1 rounded-full shadow-md"
            />
          </div>
          
          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white leading-tight line-clamp-2">
            {pyme.nombre}
          </h3>
          
          {/* Description */}
          <p className="text-white/80 text-sm mb-4 flex-grow leading-relaxed line-clamp-3">
            {pyme.descripcionCorta}
          </p>
          
          {/* Necessity */}
          <div className="mb-6">
            <p className="font-semibold text-blue_green bg-blue_green/10 rounded-lg p-3 text-sm border border-blue_green/20">
              {pyme.necesidad}
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="relative z-10 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex-1" />
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Button
                label="Analizar"
                icon="pi pi-bolt"
                iconPos="right"
                className="bg-gradient-to-r from-cream to-cream/90 text-space_cadet font-bold border-none rounded-xl py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                onClick={() => setOpen(true)}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <Dialog
        header={open ? `Invertir en ${pyme.nombre}` : "Generar Contrato"}
        visible={open}
        onHide={() => {}}
        style={{ width: "95vw", maxWidth: "1200px" }}
        className="rounded-2xl p-0"
        contentClassName="p-0"
        closable={true}
        blockScroll={false}
        maximizable={true}
      >
        <InvestorForm pyme={pyme} onFormSubmit={() => setOpen(false)} />
      </Dialog>
    </motion.div>
  );
};

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const OpportunitiesDashboard = () => {
  const [pymes] = useState<Pyme[]>(getPymes());

  const initialCoords: [number, number] = [-17.7833, -63.1821];
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>(initialCoords);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isGeolocating, setIsGeolocating] = useState(false);
  
  const handleGeolocate = () => {
    setIsGeolocating(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const userLat = pos.coords.latitude;
      const userLng = pos.coords.longitude;
      
      setLatitude(userLat.toFixed(6));
      setLongitude(userLng.toFixed(6));
      setMapCenter([userLat, userLng]);
      setUserLocation([userLat, userLng]);
      setIsGeolocating(false);
    }, (error) => {
      console.error('Error getting location:', error);
      setIsGeolocating(false);
      let errorMessage = 'No se pudo obtener tu ubicación.';
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Permiso de ubicación denegado. Por favor habilita la ubicación en tu navegador.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Información de ubicación no disponible.';
          break;
        case error.TIMEOUT:
          errorMessage = 'Tiempo de espera agotado al obtener la ubicación.';
          break;
      }
      
      alert(errorMessage);
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    });
  };
  
  const dispatch = useDispatch<AppDispatch>();
  
  const handleSearch = () => {
    if (latitude == "" || longitude == "") {
      return;
    }
    const data: LocationState = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    };
    dispatch(changeLocation(data));
    
    // Scroll to opportunities section
    const opportunitiesSection = document.getElementById('oportunidades-disponibles');
    if (opportunitiesSection) {
      opportunitiesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  const words = ["Apoyo", "Legado", "Ascenso", "Sostenibilidad"];

  // Filtrar PYMEs cercanas (3km) si hay userLocation
  const nearbyPymes: Place[] = userLocation
    ? pymes.filter(p =>
        getDistanceFromLatLonInKm(
          userLocation[0],
          userLocation[1],
          p.ubicacion.lat,
          p.ubicacion.lng
        ) < 3
      ).map(p => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria,
        lat: p.ubicacion.lat,
        lng: p.ubicacion.lng
      }))
    : pymes.map(p => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria,
        lat: p.ubicacion.lat,
        lng: p.ubicacion.lng
      }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 pt-32 sm:pt-40 lg:pt-16">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Oportunidad para obtener
            <br className="hidden sm:inline" />
            <FlipWords
              words={words}
              className="text-space_cadet md:mt-4 font-semibold"
              duration={2500}
            />
          </motion.h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Busca en el mapa o explora nuestro catálogo de oportunidades de inversión.
          </p>
        </div>

        {/* Map Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-space_cadet to-space_cadet/90 rounded-3xl shadow-2xl p-6 lg:p-8 border border-verdigris/20">
            <h2 className="text-2xl lg:text-3xl text-white font-bold mb-6">
              Busca por Ubicación
            </h2>
            <div className="bg-white/10 rounded-2xl p-4 mb-6 backdrop-blur-sm">
              <MapPicker
                center={mapCenter}
                userLocation={userLocation}
                onLocationSelect={(lat, lng) => {
                  setLatitude(lat.toFixed(6));
                  setLongitude(lng.toFixed(6));
                  setMapCenter([lat, lng]);
                  setUserLocation(null);
                }}
                places={nearbyPymes}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSearch}
                  label="Buscar Oportunidades"
                  icon="pi pi-search"
                  className="py-3 px-6 bg-gradient-to-r from-cream to-cream/90 text-space_cadet font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleGeolocate}
                  icon={isGeolocating ? "pi pi-spin pi-spinner" : "pi pi-map-marker"}
                  label={isGeolocating ? "Obteniendo ubicación..." : "Usar mi ubicación"}
                  className="py-3 px-6 bg-transparent border-2 border-cream text-cream font-semibold rounded-xl hover:bg-cream hover:text-space_cadet transition-all duration-300"
                  disabled={isGeolocating}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="max-w-7xl mx-auto" id="oportunidades-disponibles">
          <div className="mb-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-space_cadet mb-2">
              Oportunidades Disponibles
            </h2>
            <p className="text-gray-600">
              Descubre las mejores oportunidades de inversión en PyMEs
            </p>
          </div>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {pymes.map((pyme) => (
              <PymeCard key={pyme.id} pyme={pyme} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesDashboard;