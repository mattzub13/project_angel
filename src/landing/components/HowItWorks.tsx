import { motion } from "framer-motion";

const BentoBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={`p-6 rounded-2xl shadow-sm ${className}`}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const ProcessStep = ({ icon, title, description }: { icon: string; title:string; description: string; }) => {
  return (
    <div className="flex flex-col items-center text-center flex-1 p-4">
      <i className={`${icon} text-4xl text-blue_green mb-4`}></i>
      <h3 className="text-xl font-bold text-blue_green-200 mb-2">{title}</h3>
      <p className="text-blue_green-300 max-w-xs">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-16 sm:py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {}
          <BentoBox className="lg:col-span-3 bg-blue_green-100 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Un Proceso Simple para el Éxito
            </h2>
            <p className="text-lg text-blue_green-800">
              Conectar capital con potencial nunca fue tan fácil. Así funciona
              nuestra aceleradora.
            </p>
          </BentoBox>

          {}

          {}
          <BentoBox className="bg-light_sky lg:col-span-3 flex flex-col md:flex-row justify-around">
            <ProcessStep 
              icon="pi pi-search"
              title="1. Descubre"
              description="Explora un catálogo curado de PYMES con alto potencial."
            />
            <ProcessStep 
              icon="pi pi-chart-line"
              title="2. Invierte"
              description="Realiza tu inversión de forma segura a través de la plataforma."
            />
            <ProcessStep 
              icon="pi pi-gift"
              title="3. Impacta"
              description="Sigue el progreso del negocio y observa cómo crece."
            />
          </BentoBox>

           {}
          <BentoBox className="bg-light_sky lg:col-span-3 flex flex-col md:flex-row justify-around">
            <ProcessStep 
              icon="pi pi-file-edit"
              title="1. Postula"
              description="Completa un formulario simple sobre tu negocio y tus metas."
            />
            <ProcessStep 
              icon="pi pi-check-circle"
              title="2. Verifica"
              description="Nuestro equipo analiza tu postulación para asegurar tu potencial."
            />
            <ProcessStep 
              icon="pi pi-spin pi-spinner"
              title="3. Despega"
              description="Conéctate con inversionistas y asegura el capital para crecer."
            />
          </BentoBox>
          
          {}
          <BentoBox className="lg:col-span-3 bg-blue_green flex flex-col justify-center items-center text-center text-white py-12">
            <p className="text-5xl font-black">85%</p>
            <p className="text-lg mt-2">Meta de tasa de éxito en negocios fondeados en el primer año.</p>
          </BentoBox>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;