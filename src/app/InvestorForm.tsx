import { Button } from 'primereact/button';
import { motion } from 'framer-motion';
import { Tag } from 'primereact/tag';
//import { Knob } from 'primereact/knob';
import { type Pyme } from '../services/mockDataService';
import TypewriterText from '../components/TypewriterText';
import AnimatedProgressBar from '../components/AnimatedProgressBar';
import ContractForm from './ContractForm';
import { useState } from 'react';

interface InvestorFormProps {
  pyme: Pyme;
  onFormSubmit: () => void;
}

const InvestorForm = ({ pyme, onFormSubmit }: InvestorFormProps) => {
  const [showContractForm, setShowContractForm] = useState(false);

  const handleSubmit = () => {
    console.log(`Interés confirmado para la pyme: ${pyme.id} - ${pyme.nombre}`);
    setShowContractForm(true);
  }

  const handleContractClose = () => {
    setShowContractForm(false);
    onFormSubmit();
  }

  if (showContractForm) {
    return <ContractForm pyme={pyme} onClose={handleContractClose} />;
  }

  return (
    <motion.div 
      className="w-full p-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <div className="text-center mb-4">
            
            <h3 className="text-2xl font-bold text-space_cadet mb-2">
                Confirmar Interés de Inversión
            </h3>
            <p className="text-gray-600">
                Estás a un paso de apoyar a <strong className="text-blue_green">{pyme.nombre}</strong>.
            </p>
        </div>

        {/* Layout Horizontal Principal */}
        <div className="flex gap-6 items-start">
            {/* Columna 1: Resumen de la Oportunidad + Rating */}
            <div className="bg-light_sky p-6 rounded-xl border border-gray-200 text-left flex-1">
                <div className="mb-4">
                    <h4 className="font-bold text-secondary">Resumen de la Oportunidad:</h4>
                </div>
                
                <ul className="space-y-3 text-secondary mb-4">
                    <li className="flex justify-between">
                        <span>Negocio:</span>
                        <span className="text-right">{pyme.nombre}</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Categoría:</span>
                        <Tag value={pyme.categoria} className="bg-blue_green text-white font-bold" />
                    </li>
                    <li className="flex justify-between">
                        <span>Necesidad de Capital:</span>
                        <span className="text-right">${pyme.montoNecesario.toLocaleString('en-US')}</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Propósito:</span>
                        <span className="text-left max-w-[60%]">{pyme.necesidad}</span>
                    </li>
                </ul>

                {/* Match Indicator */}
                <div className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-bold ${
                    pyme.rating >= 60 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : 'bg-red-100 text-red-700 border border-red-300'
                }`}>
                    <span className="text-lg">{pyme.rating >= 60 ? '🤝' : '❌'}</span>
                    <span>{pyme.rating >= 60 ? 'Match' : 'No Match'}</span>
                </div>
            </div>

            {/* Columna 2: Análisis de IA */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <i className="pi pi-microchip text-2xl text-blue-600"></i>
                    <h4 className="font-bold text-blue-900 text-lg">Análisis de IA</h4>
                </div>
                
                <div className="mb-4">
                    <AnimatedProgressBar 
                        value={pyme.ai_analysis.analysis.relevance_score}
                        duration={2000}
                    />
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-100 min-h-[120px]">
                    <TypewriterText 
                        text={pyme.ai_analysis.analysis.analysis_summary}
                        speed={30}
                        className="text-sm text-gray-700 leading-relaxed"
                    />
                </div>
            </div>
        </div>

        <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-4">
                Al confirmar, un asesor de A.L.A.S. se pondrá en contacto contigo para completar el proceso de verificación (KYC) y formalizar la inversión de manera segura.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                        label="Sí, confirmo mi interés" 
                        className="bg-cream text-blue_green-100 font-bold border-none rounded-lg py-3 px-5 shadow-md hover:brightness-105" 
                        onClick={handleSubmit} 
                    />
                </motion.div>
                
                <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                >
                    <Button 
                        label="Análisis de Perfil Financiero"
                        icon="👑"
                        iconPos="left"
                        className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold border-none rounded-lg py-3 px-5 shadow-md opacity-60 cursor-not-allowed" 
                        disabled={true}
                    />
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        PREMIUM
                    </div>
                </motion.div>
            </div>
        </div>
    </motion.div>
  );
};

export default InvestorForm;