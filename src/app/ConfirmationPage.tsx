import { Button } from 'primereact/button';
const ConfirmationPage = () => {
  return (
    <div className="">
      <div className="text-center  bg-white rounded-2xl flex flex-col items-center max-w-[450px]">
        <i className="pi pi-check-circle text-6xl text-green-500 mb-4"></i>
        <h2 className="text-3xl font-bold mb-2 text-secondary">
          ¡Tu Interés ha sido Registrado con Éxito!
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Gracias por tu confianza en A.L.A.S. y en las PYMES de nuestra comunidad.
        </p>

        <div className="text-left border-t border-b py-6">
          <h3 className="font-bold text-xl mb-4 text-secondary">Próximos Pasos:</h3>
          <ul className="list-decimal list-inside space-y-3 text-gray-700">
            <li><strong>Verificación (24h):</strong> Nuestro equipo se pondrá en contacto contigo para un breve proceso de verificación de identidad (KYC).</li>
            <li><strong>Formalización:</strong> Te enviaremos el acuerdo de inversión con todos los detalles legales para tu revisión y firma digital.</li>
            <li><strong>Transferencia Segura:</strong> Una vez firmado el acuerdo, se habilitará la transferencia de fondos a través de nuestra **pasarela de pago segura** o a una cuenta de fideicomiso designada.</li>
          </ul>
        </div>

        <Button
          label="Explorar más Oportunidades"
          className=" px-5 py-2 text-white md:w-auto mt-8 p-button-lg bg-blue_green hover:bg-blue_green-400 border-none"
        //onClick={onReturnToDashboard}
        />
      </div>
    </div>
  );
};

export default ConfirmationPage;