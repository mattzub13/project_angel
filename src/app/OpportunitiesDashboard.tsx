import { useState } from 'react';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { motion } from 'framer-motion';

// Definimos la "forma" de los datos de una PYME (el contrato con el backend)
interface Pyme {
  id: string;
  nombre: string;
  categoria: string;
  rating: number;
  descripcionCorta: string;
  necesidad: string;
}

const OpportunitiesDashboard = ({ onNavigateToForm }: { onNavigateToForm: () => void }) => {
  // Usamos datos de ejemplo ("mock data") para construir la UI.
  // El backend luego reemplazará esto con datos reales.
  const [pymes] = useState<Pyme[]>([
    { id: 'pyme-123', nombre: 'Salteñería "El Prado"', categoria: 'Restaurante', rating: 8.5, descripcionCorta: 'Las salteñas más queridas de la zona, con receta familiar.', necesidad: 'Buscan $1,500 para un nuevo horno.' },
    { id: 'pyme-456', nombre: 'Café "El Rincón Lector"', categoria: 'Cafetería', rating: 7.8, descripcionCorta: 'Un espacio acogedor para amantes del café de especialidad.', necesidad: 'Necesitan $800 para renovar mobiliario.' },
    { id: 'pyme-789', nombre: 'Taller "El Rayo Veloz"', categoria: 'Servicios', rating: 9.1, descripcionCorta: 'Mecánica de confianza con la calificación más alta de la ciudad.', necesidad: 'Inversión de $2,500 para equipo de diagnóstico.' },
  ]);

  // Esta función es la plantilla para cada tarjeta de PYME
  const itemTemplate = (pyme: Pyme) => {
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
<Button icon="pi pi-arrow-right" label="Ver Detalle e Invertir" className="w-full mt-6 bg-blue_green-200 border-none" onClick={onNavigateToForm} />        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-4 sm:p-8 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-blue_green-100">Oportunidades de Inversión</h1>
        <p className="text-lg text-secondary mt-2">Descubre y apoya a los pequeños negocios con mayor potencial de tu comunidad.</p>
      </div>
      <DataView value={pymes} itemTemplate={itemTemplate} layout="grid" />
    </div>
  );
};

export default OpportunitiesDashboard;