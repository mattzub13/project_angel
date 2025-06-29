import { useState } from 'react';

interface PDFPreviewProps {
  pdfBase64: string;
  className?: string;
}

const PDFPreview = ({ pdfBase64, className = "" }: PDFPreviewProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setLoading(false);
    setError(null);
  };

  const handleError = () => {
    setError('Error al cargar el PDF');
    setLoading(false);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue_green"></div>
          <span className="ml-2 text-gray-600">Cargando PDF...</span>
        </div>
      )}

      {error && (
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="pi pi-exclamation-triangle text-2xl text-red-500"></i>
          </div>
          <p className="text-red-500 mb-2">Error al cargar el PDF</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      )}
      
      {!error && (
        <div className="border border-gray-200 rounded-lg shadow-lg bg-white w-full">
          <iframe
            src={`data:application/pdf;base64,${pdfBase64}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-[600px]"
            title="PDF Preview"
            onLoad={handleLoad}
            onError={handleError}
            style={{ minHeight: '600px' }}
          />
        </div>
      )}

      {!loading && !error && (
        <div className="text-center mt-4">
          <span className="text-sm text-gray-500">
            Vista previa del PDF
          </span>
        </div>
      )}
    </div>
  );
};

export default PDFPreview; 