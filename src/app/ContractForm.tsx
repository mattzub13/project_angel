import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { motion } from 'framer-motion';
import { type Pyme } from '../services/mockDataService';
import TypewriterText from '../components/TypewriterText';
import ContractPreviewModal from '../components/ContractPreviewModal';
import { PDF_BASE64_EXAMPLE } from '../data/pdf-base64-example';

interface ContractFormProps {
  pyme: Pyme;
  onClose: () => void;
}

// Datos del contrato generados por IA
const contractData = {
  para_inversor: {
    monto: "SIETE MIL 00/100 BOLIVIANOS (Bs. 7.000.-)",
    interes: "OCHO POR CIENTO (8%) de interés simple anual sobre el capital prestado (Bs. 560.- anuales)",
    plazo: "DOCE (12) MESES",
    garantias: "EL DEUDOR garantiza a EL INVERSOR con todos sus bienes presentes y futuros, conforme a lo establecido en el Artículo 1335 del Código Civil Boliviano."
  },
  para_negocio: {
    obligaciones: [
      "Devolver el capital prestado más los intereses generados, en la forma y plazos establecidos.",
      "Utilizar el capital única y exclusivamente para la expansión, mejora de infraestructura, o adquisición de insumos del negocio.",
      "Proporcionar a EL INVERSOR, previa solicitud y con razonable antelación, información sobre el progreso y uso de los fondos, así como el estado financiero básico de \"MAJADITO 'EL CAMBA'\", en tanto no comprometa secretos comerciales sensibles."
    ],
    penalidades: [
      "En caso de mora en el pago de alguna cuota, se aplicará un interés moratorio del TRES POR CIENTO (3%) anual sobre el saldo deudor de la cuota impaga, sumado al interés contractual.",
      "La mora se producirá de forma automática por el solo vencimiento del plazo de cada cuota.",
      "El incumplimiento en el pago de DOS (2) cuotas mensuales consecutivas o TRES (3) discontinuas resultará en la resolución del contrato y hará que la totalidad de la deuda se considere de plazo vencido, líquida y exigible, facultando a EL INVERSOR a iniciar acciones legales, siendo los gastos y costas judiciales a cargo de EL DEUDOR."
    ],
    fechas_clave: [
      "Inicio del plazo: A partir de la fecha de suscripción del contrato.",
      "Pago de cuotas: DOCE (12) cuotas mensuales, iguales y consecutivas de SEISCIENTOS TREINTA 00/100 BOLIVIANOS (Bs. 630.-) cada una.",
      "Primera cuota: El día especificado del mes siguiente a la firma del contrato.",
      "Cuotas subsiguientes: El mismo día de cada mes consecutivo hasta la cancelación total de la deuda."
    ]
  }
};

const ContractForm = ({ pyme, onClose }: ContractFormProps) => {
  const [investorName, setInvestorName] = useState('');
  const [amount, setAmount] = useState('');
  const [contractConditions, setContractConditions] = useState('');
  const [generatedContract, setGeneratedContract] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const contractOptions = [
    { label: 'Contrato de Préstamo Simple', value: 'simple' },
    { label: 'Contrato con Garantías', value: 'garantias' },
    { label: 'Contrato de Inversión Participativa', value: 'participativa' },
    { label: 'Contrato de Préstamo con Interés Compuesto', value: 'compuesto' }
  ];

  const generateContract = async () => {
    if (!investorName || !amount || !contractConditions) {
      alert('Por favor completa todos los campos');
      return;
    }

    setIsGenerating(true);
    
    // Simular generación del contrato - tiempo reducido
    setTimeout(() => {
      const contractText = `
CONTRATO DE PRÉSTAMO ENTRE INVERSOR Y PYME

INVERSOR: ${investorName}
PYME: ${pyme.nombre}
MONTO: ${amount}
CONDICIONES: ${contractConditions}

CLÁUSULAS PRINCIPALES:

PARA EL INVERSOR:
- Monto: ${contractData.para_inversor.monto}
- Interés: ${contractData.para_inversor.interes}
- Plazo: ${contractData.para_inversor.plazo}
- Garantías: ${contractData.para_inversor.garantias}

PARA EL NEGOCIO:
Obligaciones:
${contractData.para_negocio.obligaciones.map(obligacion => `• ${obligacion}`).join('\n')}

Penalidades:
${contractData.para_negocio.penalidades.map(penalidad => `• ${penalidad}`).join('\n')}

Fechas Clave:
${contractData.para_negocio.fechas_clave.map(fecha => `• ${fecha}`).join('\n')}

Este contrato ha sido generado automáticamente por el sistema ALAS.
      `;
      
      setGeneratedContract(contractText);
      setIsGenerating(false);
    }, 500);
  };

  const openPreviewModal = () => {
    if (!generatedContract) {
      alert('Primero genera el contrato para ver la preview');
      return;
    }
    setShowPreviewModal(true);
  };

  return (
    <>
      <motion.div 
        className="w-full p-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-space_cadet mb-2">
            Generar Contrato de Inversión
          </h3>
          <p className="text-gray-600">
            Completa los datos para generar el contrato con {pyme.nombre}
          </p>
        </div>

        {/* Formulario */}
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Inversor
            </label>
            <InputText
              value={investorName}
              onChange={(e) => setInvestorName(e.target.value)}
              placeholder="Ingresa tu nombre completo"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue_green focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto de Inversión
            </label>
            <InputText
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ej: Bs. 7.000.-"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue_green focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Contrato
            </label>
            <Dropdown
              value={contractConditions}
              onChange={(e) => setContractConditions(e.value)}
              options={contractOptions}
              placeholder="Selecciona el tipo de contrato"
              className="w-full"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                label={isGenerating ? "Generando..." : "Generar Contrato"}
                icon={isGenerating ? "pi pi-spin pi-spinner" : "pi pi-file-pdf"}
                className="w-full bg-gradient-to-r from-blue_green to-blue_green/90 text-white font-bold border-none rounded-xl py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={generateContract}
                disabled={isGenerating}
              />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                label="Ver Preview"
                icon="pi pi-eye"
                className="bg-gradient-to-r from-cream to-cream/90 text-space_cadet font-bold border-none rounded-xl py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={openPreviewModal}
                disabled={!generatedContract}
              />
            </motion.div>
          </div>

          {/* Texto generado por IA con efecto typewriter */}
          {generatedContract && (
            <div className="mt-6 p-4 bg-gradient-to-br from-blue_green/10 to-verdigris/10 rounded-xl border border-blue_green/20">
              <h4 className="font-bold text-blue_green mb-3 flex items-center">
                <span className="mr-2">🤖</span>
                Contrato Generado por IA
              </h4>
              <div className="bg-white p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                <TypewriterText 
                  text={generatedContract}
                  speed={30}
                  className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Botón cerrar */}
          <div className="flex justify-center pt-4">
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

      {/* Modal de Preview */}
      <ContractPreviewModal
        visible={showPreviewModal}
        onHide={() => setShowPreviewModal(false)}
        contractText={generatedContract}
        pdfBase64={PDF_BASE64_EXAMPLE}
      />
    </>
  );
};

export default ContractForm; 