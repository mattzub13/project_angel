import { useState } from 'react';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { motion } from 'framer-motion';
import { Dialog } from 'primereact/dialog';
import InvestorForm from './InvestorForm';
import { MapPicker } from '../components/MapPicker';
// Definimos la "forma" de los datos de una PYME (el contrato con el backend)
interface Coordinates {
  lat: number;
  lng: number;
}

export interface Pyme {
  id: string;
  nombre: string;
  categoria: string;
  rating: number;
  amount: number;
  descripcionCorta: string;
  necesidad: string;
}

const OpportunitiesDashboard = () => {
  // Usamos datos de ejemplo ("mock data") para construir la UI.
  // El backend luego reemplazará esto con datos reales.
  const [pymes] = useState<Pyme[]>([
    { id: 'pyme-123', nombre: 'Salteñería "El Prado"', categoria: 'Restaurante', rating: 8.5, descripcionCorta: 'Las salteñas más queridas de la zona, con receta familiar.', necesidad: 'Buscan $1,500 para un nuevo horno.', amount: 500 },
    { id: 'pyme-456', nombre: 'Café "El Rincón Lector"', categoria: 'Cafetería', rating: 7.8, descripcionCorta: 'Un espacio acogedor para amantes del café de especialidad.', necesidad: 'Necesitan $800 para renovar mobiliario.', amount: 800 },
    { id: 'pyme-789', nombre: 'Taller "El Rayo Veloz"', categoria: 'Servicios', rating: 9.1, descripcionCorta: 'Mecánica de confianza con la calificación más alta de la ciudad.', necesidad: 'Inversión de $2,500 para equipo de diagnóstico.', amount: 2500 },
  ]);

  // Esta función es la plantilla para cada tarjeta de PYME
  const itemTemplate = (pyme: Pyme) => {
    const [open, setOpen] = useState(false)
    return (
      <motion.div
        className="col-12 md:col-4 p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 border rounded-2xl h-full flex flex-col justify-between bg-light_sky shadow-md hover:shadow-xl transition-shadow">
          <div>
            <div className="flex justify-between items-start">
              <Tag value={pyme.categoria} className="bg-blue_green text-white"></Tag>
              <div className="text-2xl font-bold text-blue_green-100 flex items-center gap-2">
                <i className="pi pi-star-fill text-yellow-500"></i>
                {pyme.rating}
              </div>
            </div>
            <h3 className="text-2xl font-bold my-4 text-blue_green-200">{pyme.nombre}</h3>
            <p className="text-secondary">{pyme.descripcionCorta}</p>
            <p className="font-semibold mt-2 text-blue_green">{pyme.necesidad}</p>
          </div>
          <Button icon="pi pi-arrow-right" label="Ver Detalle e Invertir" className=" mt-6 bg-blue_green-200 border-none text-white w-60 py-2 px-4 hover:scale-110 transition-all duration-300" iconPos='right' onClick={() => setOpen(true)} />        </div>
        <Dialog className='bg-light_sky' visible={open} onHide={() => setOpen(false)} draggable={false}>
          <InvestorForm pyme={pyme} />
        </Dialog>
      </motion.div>
    );
  };
  const santaCruzPosition: [number, number] = [-17.7833, -63.1822];
  const listTemplate = (items: Pyme[]) => {
    if (!items || items.length === 0) return null;

    let list = items.map((product) => {
      return itemTemplate(product);
    });

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{list}</div>;
  };
  const [selectedCoords, setSelectedCoords] = useState<Coordinates | null>(null);

  // Función que se pasará como prop a MapPicker
  // Se ejecutará cada vez que el usuario haga clic en el mapa
  const handleLocationSelection = (lat: number, lng: number) => {
    console.log("Coordenadas recibidas en el componente padre:", { lat, lng });
    setSelectedCoords({ lat, lng });
  };
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Mi Aplicación con Mapa Interactivo</h1>

      {/* 3. Llama a tu componente y pásale la prop `onLocationSelect` */}
      <MapPicker onLocationSelect={handleLocationSelection} />

      <div style={{ marginTop: '20px', fontSize: '1.2em' }}>
        <h2>Coordenadas Seleccionadas:</h2>
        {selectedCoords ? (
          <p>
            <strong>Latitud:</strong> {selectedCoords.lat.toFixed(6)} <br />
            <strong>Longitud:</strong> {selectedCoords.lng.toFixed(6)}
          </p>
        ) : (
          <p>Por favor, haz clic en el mapa para seleccionar una ubicación.</p>
        )}
      </div>
    </div>
  );
};

export default OpportunitiesDashboard;