import { Accordion, AccordionTab } from "primereact/accordion";
import { motion } from "framer-motion";

const BentoBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      className={`bg-light_sky p-6 rounded-2xl shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const TrustSection = () => {
  return (
    <section id="confianza" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {}
          <BentoBox className="lg:col-span-3 bg-secondary text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-600">
              Tu Inversión y tu Negocio, Seguros
            </h2>
            <p className="text-lg text-gray-600">
              La confianza es nuestro pilar. Por eso hemos construido una
              plataforma transparente y segura.
            </p>
          </BentoBox>

          {}
          <BentoBox>
            <h3 className="text-xl font-bold text-primary mb-2">
              ✔️ Verificación
            </h3>
            <p>
              Cada negocio pasa por un proceso de validación para asegurar su
              viabilidad y legitimidad.
            </p>
          </BentoBox>
          <BentoBox>
            <h3 className="text-xl font-bold text-primary mb-2">
              🔒 Seguridad
            </h3>
            <p>
              Usamos encriptación de punta a punta para proteger tu información
              personal y financiera.
            </p>
          </BentoBox>
          <BentoBox>
            <h3 className="text-xl font-bold text-primary mb-2">
              🤝 Equipo Transparente
            </h3>
            <p>
              Somos un equipo apasionado por el desarrollo local. ¡Conócenos!
            </p>
          </BentoBox>

          {}
          <BentoBox className="lg:col-span-3">
            <h3 className="text-2xl font-bold text-secondary mb-6 text-center">
              Preguntas Frecuentes
            </h3>
            {}
            <Accordion>
              <AccordionTab header="¿Cómo se minimiza el riesgo de mi inversión?">
                <p className="m-0 text-gray-700">
                  Nuestro filtro inteligente y el modelo de aceleradora están
                  diseñados para maximizar el potencial de éxito, aunque toda
                  inversión conlleva riesgos.
                </p>
              </AccordionTab>
              <AccordionTab header="¿Cómo gana dinero la plataforma?">
                <p className="m-0 text-gray-700">
                  Cobramos una comisión de éxito sobre el capital levantado.
                  Solo ganamos si nuestros negocios y nuestros inversionistas
                  ganan.
                </p>
              </AccordionTab>
            </Accordion>
          </BentoBox>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
