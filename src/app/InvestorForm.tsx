import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Checkbox } from 'primereact/checkbox';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useRef, useState } from 'react';
import type { Pyme } from "./OpportunitiesDashboard";
import { UploadFile } from "../components/UploadFiles";
import ConfirmationPage from "./ConfirmationPage";

const InvestorForm = ({ pyme }: { pyme: Pyme }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const stepper = useRef(null)
  const [preview, setPreview] = useState<string | null>(null);
  const [selected, setSelected] = useState<File | null>(null);
  const confirmUpload = async () => {
    // const base64 = await fileService.fileToBase64(selected);

    // updateFormData({
    //   ...formData,
    //   logoStorageUrl: base64,
    // });
  };
  return (
    <div className="card">
      <Stepper ref={stepper} className="" style={{ flexBasis: '50rem' }} orientation="vertical">
        <StepperPanel header="Informacion Personal">
          <div className="flex justify-center items-center">
            <div className="w-full max-w-lg  bg-white rounded-2xl ">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2 text-secondary">
                  Manifiesta tu Interés
                </h2>
                <p className="text-gray-600 mb-8">
                  Estás a un paso de invertir en <strong className="text-blue_green">{pyme.nombre}</strong>.
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <FloatLabel>
                  <InputText id="fullname" className="w-full border-2 border-neutral-silver p-2" />
                  <label htmlFor="fullname">Nombre Completo</label>
                </FloatLabel>
                <FloatLabel>
                  <InputText id="email" type="email" className="w-full border-2 border-neutral-silver p-2" />
                  <label htmlFor="email">Correo Electrónico</label>
                </FloatLabel>
                <p>Monto a invertir: <span className="text-blue_green font-bold">{pyme.amount}Bs.</span> </p>
                <p>Comision : <span className="text-blue_green font-bold">{pyme.amount * 0.10}Bs.</span></p>
              </div>

              <div className="flex items-center mt-8">
                <Checkbox inputId="terms" onChange={e => setChecked(e.checked ?? false)} checked={checked}></Checkbox>
                <label htmlFor="terms" className="ml-2 text-sm text-font">Acepto los Términos y entiendo los riesgos de la inversión.</label>
              </div>
              <Button
                label="Enviar Interés de Inversión"
                className="w-full text-white py-2 mt-6 p-button-lg bg-blue_green hover:bg-blue_green-400 border-none"
                disabled={!checked}
                onClick={() => stepper.current?.nextCallback()}
              />
            </div>
          </div>
        </StepperPanel>
        <StepperPanel header="Carnet de Identidadd">

          <UploadFile
            label="Logo del emprendimiento"
            cardTitle="Sube el logo del emprendimiento"
            helpText="Sube una imagen clara y representativa del logo de tu emprendimiento"
            successMessage="¡Logo subido con éxito!"
            uplodaFunc={confirmUpload}
            isPdf={false}
            preview={preview}
            selectedFile={selected}
            selectedFileFunc={setSelected}
            previewFunc={(preview: string | ArrayBuffer | null) => {
              if (typeof preview === "string" || preview === null) {
                setPreview(preview);
              } else if (preview instanceof ArrayBuffer) {
                const reader = new FileReader();
                reader.onload = () => setPreview(reader.result as string);
                reader.readAsDataURL(new Blob([preview]));
              }
            }}
            formValue={""}
            nullFunc={() => {
              setPreview(null);
              setSelected(null);
            }}
          />
          <div className="flex pt-4 justify-content-between gap-5">
            <Button className="gap-5 px-5 text-white py-2 mt-6 p-button-lg bg-blue_green hover:bg-blue_green-400 border-none" label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepper.current.prevCallback()} />
            <Button className="gap-5 px-5 text-white py-2 mt-6 p-button-lg bg-blue_green hover:bg-blue_green-400 border-none" label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepper.current.nextCallback()} />
          </div>
        </StepperPanel>
        <StepperPanel header="Finaliza el proceso"><ConfirmationPage /></StepperPanel>
      </Stepper>
    </div>
  );
};

export default InvestorForm;