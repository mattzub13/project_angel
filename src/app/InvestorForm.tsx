import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import type { Pyme } from './OpportunitiesDashboard'; 
interface InvestorFormProps {
  pyme: Pyme;
  onFormSubmit: () => void;
}

const InvestorForm = ({ pyme, onFormSubmit }: InvestorFormProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const investmentRanges = [
    { label: '$100 - $500', value: '100-500' },
    { label: '$501 - $2000', value: '501-2000' },
    { label: 'Más de $2000', value: '2000+' }
  ];

  const handleSubmit = () => {
    alert(`Interés registrado para ${pyme.nombre}!`);
    onFormSubmit();
  }

  return (
    <div className="w-full p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-8">
            Estás a un paso de invertir en <strong className="text-blue_green">{pyme.nombre}</strong>.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <FloatLabel><InputText id="fullname" className="w-full" /><label htmlFor="fullname">Nombre Completo</label></FloatLabel>
          <FloatLabel><InputText id="email" type="email" className="w-full" /><label htmlFor="email">Correo Electrónico</label></FloatLabel>
          <FloatLabel><Dropdown inputId="investmentAmount" options={investmentRanges} className="w-full" /><label htmlFor="investmentAmount">Monto a invertir</label></FloatLabel>
        </div>
        <div className="flex items-center mt-8">
          <Checkbox inputId="terms" onChange={e => setChecked(e.checked ?? false)} checked={checked}></Checkbox>
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">Acepto los Términos y entiendo los riesgos.</label>
        </div>
        <Button label="Enviar Interés" className="w-full mt-6 p-button-lg bg-blue_green" onClick={handleSubmit} disabled={!checked} />
    </div>
  );
};

export default InvestorForm;