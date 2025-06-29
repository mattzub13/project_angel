import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { motion } from 'framer-motion';
import { type Pyme } from '../services/mockDataService';

interface ContractFormProps {
  pyme: Pyme;
  onClose: () => void;
}

interface ContractData {
  negocio: string;
  inversor: string;
  monto: string;
  condiciones: string;
}

const ContractForm = ({ pyme, onClose }: ContractFormProps) => {
  const [formData, setFormData] = useState<ContractData>({
    negocio: pyme.nombre,
    inversor: '',
    monto: '',
    condiciones: ''
  });

  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContract, setGeneratedContract] = useState<string>('');

  const conditionOptions = [
    { label: 'A 6 meses con interés simple del 10%, devolución en cuotas mensuales', value: '6_meses_10' },
    { label: 'A 12 meses con interés simple del 8%, devolución en cuotas mensuales', value: '12_meses_8' },
    { label: 'A 18 meses con interés simple del 6%, devolución en cuotas mensuales', value: '18_meses_6' },
    { label: 'A 24 meses con interés simple del 5%, devolución en cuotas mensuales', value: '24_meses_5' },
    { label: 'A 3 meses con interés simple del 12%, devolución al vencimiento', value: '3_meses_12' },
    { label: 'A 9 meses con interés simple del 7%, devolución en cuotas bimestrales', value: '9_meses_7' }
  ];

  const handleConditionChange = (value: string) => {
    setSelectedCondition(value);
    const selectedOption = conditionOptions.find(option => option.value === value);
    setFormData(prev => ({
      ...prev,
      condiciones: selectedOption ? selectedOption.label : ''
    }));
  };

  const handleSubmit = async () => {
    if (!formData.inversor || !formData.monto || !formData.condiciones) {
      alert('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/generar-contrato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const contractText = await response.text();
        setGeneratedContract(contractText);
      } else {
        throw new Error('Error al generar el contrato');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar el contrato. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="w-full p-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <i className="pi pi-file-pdf text-4xl text-verdigris mb-4"></i>
        <h3 className="text-2xl font-bold text-space_cadet mb-2">
          Generar Propuesta de Contrato
        </h3>
        <p className="text-gray-600">
          Completa los datos para generar la propuesta de contrato con <strong className="text-blue_green">{pyme.nombre}</strong>
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-light_sky p-6 rounded-xl border border-gray-200 mb-6">
          <h4 className="font-bold text-secondary mb-4">Información del Negocio:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-secondary">
            <div>
              <span className="font-semibold">Negocio:</span>
              <p>{pyme.nombre}</p>
            </div>
            <div>
              <span className="font-semibold">Categoría:</span>
              <p>{pyme.categoria}</p>
            </div>
            <div>
              <span className="font-semibold">Necesidad:</span>
              <p>${pyme.montoNecesario.toLocaleString('en-US')}</p>
            </div>
            <div>
              <span className="font-semibold">Rating:</span>
              <p>{pyme.rating}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
          <h4 className="font-bold text-secondary mb-4">Datos del Contrato:</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre del Inversor *
              </label>
              <InputText
                value={formData.inversor}
                onChange={(e) => setFormData(prev => ({ ...prev, inversor: e.target.value }))}
                placeholder="Ingresa tu nombre completo"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monto a Invertir *
              </label>
              <InputText
                value={formData.monto}
                onChange={(e) => setFormData(prev => ({ ...prev, monto: e.target.value }))}
                placeholder="Ej: 5000 Bs"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Condiciones del Contrato *
              </label>
              <Dropdown
                value={selectedCondition}
                onChange={(e) => handleConditionChange(e.value)}
                options={conditionOptions}
                placeholder="Selecciona las condiciones"
                className="w-full"
                optionLabel="label"
                optionValue="value"
              />
            </div>
          </div>
        </div>

        {generatedContract && (
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-6">
            <h4 className="font-bold text-green-800 mb-3">✅ Contrato Generado Exitosamente</h4>
            <div className="bg-white p-4 rounded-lg border border-green-300 max-h-60 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                {generatedContract}
              </pre>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              label="Generar propuesta de contrato"
              icon="pi pi-download"
              className="bg-gradient-to-r from-cream to-cream/90 text-space_cadet font-bold border-none rounded-xl py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/documents_AI/Contrato_20250629_020637.pdf';
                link.download = 'Contrato_20250629_020637.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            />
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              label="Cerrar"
              className="bg-gray-500 text-white font-bold border-none rounded-lg py-3 px-6 shadow-md hover:shadow-lg transition-all duration-300"
              onClick={onClose}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContractForm; 