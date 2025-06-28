import { motion } from "framer-motion";

const BentoBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={`bg-nyanza p-6 rounded-2xl shadow-sm ${className}`}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);


const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BentoBox className="lg:col-span-3 bg-secondary text-blue_green-100">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Un Proceso Simple para el Éxito
            </h2>
            <p className="text-lg text-blue_green-100">
              Conectar capital con potencial nunca fue tan fácil. Así funciona
              nuestra aceleradora.
            </p>
          </BentoBox>

          <BentoBox className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-blue_green-100">
              🔍 Para Inversionistas
            </h3>
            <ul className="space-y-3 text-secondary">
              <li>
                <strong>1. Descubre:</strong> Explora un catálogo curado de
                PYMES.
              </li>
              <li>
                <strong>2. Invierte:</strong> Realiza tu inversión de forma
                segura.
              </li>
              <li>
                <strong>3. Impacta:</strong> Sigue el progreso y el retorno.
              </li>
            </ul>
          </BentoBox> 

          <BentoBox className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              🚀 Para Negocios
            </h3>
            <ul className="space-y-3 text-secondary">
              <li>
                <strong>1. Postula:</strong> Completa un formulario simple.
              </li>
              <li>
                <strong>2. Verifica:</strong> Nuestro equipo analiza tu
                potencial.
              </li>
              <li>
                <strong>3. Despega:</strong> Recibe fondos y acelera.
              </li>
            </ul>
          </BentoBox>

          <BentoBox className="lg:col-span-1 bg-primary text-primary flex flex-col justify-center items-center text-center">
            <p className="text-4xl font-black text-primary ">85%</p>
            <p>Meta de tasa de éxito en negocios fondeados en el primer año.</p>
          </BentoBox>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
