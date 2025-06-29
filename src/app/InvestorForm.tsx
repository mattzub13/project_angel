import { Button } from 'primereact/button';
import { motion } from 'framer-motion';
import type { Pyme } from './OpportunitiesDashboard'; 
import { Tag } from 'primereact/tag';

interface InvestorFormProps {
  pyme: Pyme;
  onFormSubmit: () => void;
}

const InvestorForm = ({ pyme, onFormSubmit }: InvestorFormProps) => {
  const handleSubmit = () => {
    console.log(`Interés confirmado para la pyme: ${pyme.id} - ${pyme.nombre}`);
    onFormSubmit();
  }

  return (
    <motion.div 
      className="w-full p-4 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <i className="pi pi-briefcase text-5xl text-verdigris mb-4"></i>
      
        <h3 className="text-2xl font-bold text-space_cadet mb-2">
            Confirmar Interés de Inversión
        </h3>

        <p className="text-gray-600 mb-6">
            Estás a un paso de apoyar a <strong className="text-blue_green">{pyme.nombre}</strong>.
        </p>

        <div className="bg-light_sky p-6 rounded-xl border border-gray-200 text-left">
            <h4 className="font-bold text-secondary mb-3">Resumen de la Oportunidad:</h4>
            <ul className="space-y-2 text-secondary">
                <li className="flex justify-between">
                    <span>Negocio:</span>
                    <strong className="text-right">{pyme.nombre}</strong>
                </li>
                <li className="flex justify-between">
                    <span>Categoría:</span>
                    <Tag value={pyme.categoria} className="bg-blue_green text-white font-bold" />
                </li>
 {/*                <li className="flex justify-between">
                    <span>Necesidad de Capital:</span>
                    <strong className="text-right">${pyme.amount.toLocaleString('en-US')}</strong>
                </li> */}
                <li className="flex justify-between">
                    <span>Propósito:</span>
                    <strong className="text-right">{pyme.necesidad}</strong>
                </li>
            </ul>
        </div>

        <p className="text-xs text-gray-500 mt-6">
            Al confirmar, un asesor de A.L.A.S. se pondrá en contacto contigo para completar el proceso de verificación (KYC) y formalizar la inversión de manera segura.
        </p>
        
        {/* El botón de acción final */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6">
            <Button 
                label="Sí, confirmo mi interés" 
                className="bg-cream text-blue_green-100 font-bold border-none rounded-lg py-3 px-5 shadow-md hover:brightness-105" 
                onClick={handleSubmit} 
            />
        </motion.div>
    </motion.div>
  );
};

export default InvestorForm;