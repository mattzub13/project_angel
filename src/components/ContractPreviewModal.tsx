import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useState } from 'react';
import TypewriterText from './TypewriterText';
import PDFPreview from './PDFPreview';

interface ContractPreviewModalProps {
  visible: boolean;
  onHide: () => void;
  contractText: string;
  pdfBase64: string;
}

const ContractPreviewModal = ({ 
  visible, 
  onHide, 
  contractText, 
  pdfBase64 
}: ContractPreviewModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    setIsGenerating(true);
    
    // Simular tiempo de generación
    setTimeout(() => {
      try {
        // Convertir base64 a blob
        const byteCharacters = atob(pdfBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        
        // Crear URL y descargar
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `contrato_${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        setIsGenerating(false);
      } catch (error) {
        console.error('Error downloading PDF:', error);
        setIsGenerating(false);
      }
    }, 1000);
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      modal
      className="w-12/12 max-w-8xl"
      header={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue_green to-verdigris rounded-lg flex items-center justify-center">
            <i className="pi pi-file-pdf text-white text-lg"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold text-space_cadet">Generar Contrato</h2>
            <p className="text-sm text-gray-500">Revisa y descarga el contrato generado</p>
          </div>
        </div>
      }
      footer={
        <div className="flex justify-end gap-3">
          <Button
            label="Cerrar"
            icon="pi pi-times"
            className="p-button-text"
            onClick={onHide}
          />
          <Button
            label={isGenerating ? "Generando..." : "Descargar PDF"}
            icon={isGenerating ? "pi pi-spinner pi-spin" : "pi pi-download"}
            className="bg-gradient-to-r from-cream to-cream/90 text-space_cadet font-bold border-none rounded-xl py-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleDownload}
            disabled={isGenerating}
          />
        </div>
      }
      draggable={false}
      resizable={false}
      blockScroll={true}
      closeOnEscape={true}
      closable={true}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[85vh]">
        {/* Lado izquierdo - Texto del contrato */}
        <div className="bg-light_sky rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue_green to-verdigris rounded-lg flex items-center justify-center">
              <i className="pi pi-file-edit text-white text-sm"></i>
            </div>
            <h3 className="text-lg font-bold text-secondary">Resumen del Contrato</h3>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 h-full overflow-y-auto">
            <TypewriterText 
              text={contractText} 
              speed={30}
              className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-mono"
            />
          </div>
        </div>

        {/* Lado derecho - Preview del PDF */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <i className="pi pi-file-pdf text-white text-sm"></i>
            </div>
            <h3 className="text-lg font-bold text-blue-900">Vista Previa PDF</h3>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-100 h-full overflow-y-auto">
            <PDFPreview 
              pdfBase64={pdfBase64}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ContractPreviewModal; 