import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';

const InvestorForm = ({ onFormSubmit }: { onFormSubmit: () => void }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const investmentRanges = [
    { label: '$100 - $500', value: '100-500' },
    { label: '$501 - $2000', value: '501-2000' },
    { label: 'Más de $2000', value: '2000+' }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-light_sky p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 text-secondary">
            Manifiesta tu Interés
          </h2>
          <p className="text-gray-600 mb-8">
            Estás a un paso de invertir en <strong className="text-blue_green">Salteñería 'El Prado'</strong>.
          </p>
        </div>
        
        <div className="flex flex-col gap-8">
          <FloatLabel>
            <InputText id="fullname" className="w-full" />
            <label htmlFor="fullname">Nombre Completo</label>
          </FloatLabel>
          <FloatLabel>
            <InputText id="email" type="email" className="w-full" />
            <label htmlFor="email">Correo Electrónico</label>
          </FloatLabel>
          <FloatLabel>
            <Dropdown inputId="investmentAmount" options={investmentRanges} className="w-full" />
            <label htmlFor="investmentAmount">Monto que te gustaría invertir</label>
          </FloatLabel>
        </div>

        <div className="flex items-center mt-8">
          <Checkbox inputId="terms" onChange={e => setChecked(e.checked ?? false)} checked={checked}></Checkbox>
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">Acepto los Términos y entiendo los riesgos de la inversión.</label>
        </div>

        <Button 
          label="Enviar Interés de Inversión" 
          className="w-full mt-6 p-button-lg bg-blue_green hover:bg-blue_green-400 border-none"
          onClick={onFormSubmit} 
          disabled={!checked}
        />
      </div>
    </div>
  );
};

export default InvestorForm;