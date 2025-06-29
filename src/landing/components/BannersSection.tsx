import { motion } from 'framer-motion';
import { Button } from 'primereact/button';
import { fadeInFromBottom, staggerContainer } from '../../utils/animatios';

interface Banner {
  id: number;
  title: string;
  description: string;
  icon: string;
  ctaText: string;
}

const FeaturedCard = ({ banner }: { banner: Banner }) => {
  return (
    <motion.div variants={fadeInFromBottom} className="flex-shrink-0 w-80 md:w-96 h-full">
      <div className="h-full p-8 rounded-2xl bg-space_cadet text-white flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div>
          <i className={`${banner.icon} text-4xl text-verdigris mb-6`}></i>
          <h3 className="text-2xl font-bold mb-3">{banner.title}</h3>
          <p className="text-gray-300 text-sm">{banner.description}</p>
        </div>

        {/* Pequeño gráfico de barras decorativo y animado para el look 'data-driven' */}
        <motion.div 
            className="flex items-end gap-2 h-16 mt-8"
            variants={staggerContainer(0.3, 0.5)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.div variants={fadeInFromBottom} className="w-4 bg-verdigris/30 rounded-t-sm flex-grow" style={{ height: '40%' }}></motion.div>
            <motion.div variants={fadeInFromBottom} className="w-4 bg-verdigris/50 rounded-t-sm flex-grow" style={{ height: '60%' }}></motion.div>
            <motion.div variants={fadeInFromBottom} className="w-4 bg-verdigris/70 rounded-t-sm flex-grow" style={{ height: '80%' }}></motion.div>
            <motion.div variants={fadeInFromBottom} className="w-4 bg-verdigris rounded-t-sm flex-grow" style={{ height: '50%' }}></motion.div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
            <Button
                label={banner.ctaText}
                icon="pi pi-bolt"
                iconPos='right'
                className="bg-cream text-blue_green-100 font-bold border-none rounded-lg py-3 w-full"
            />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const BannersSection = () => {
  const banners: Banner[] = [
    { "id": 1, "title": "Invierte en tu Comunidad", "description": "Descubre proyectos locales con alto potencial y sé parte de su éxito.", "icon": "pi pi-chart-line", "ctaText": "Ver Oportunidades" },
    { "id": 2, "title": "¿Tienes una PYME?", "description": "Consigue el capital que necesitas para llevar tu negocio al siguiente nivel.", "icon": "pi pi-building", "ctaText": "Registra tu Negocio" },
    { "id": 3, "title": "Inteligencia a tu Servicio", "description": "Nuestro sistema analiza cientos de variables para ofrecerte los ratings más confiables.", "icon": "pi pi-microchip", "ctaText": "Conoce la Tecnología" }
  ];

  return (
    <section className="py-20 bg-light_sky">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInFromBottom} className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-space_cadet mb-4">Un Ecosistema de Crecimiento</h2>
          <p className="text-lg text-gray-600 max-w-3xl mb-12">Somos el puente entre tus metas financieras y el corazón de tu comunidad.</p>
        </motion.div>
        
        <motion.div 
            className="flex overflow-x-auto gap-6 pb-8 px-4 sm:px-6 lg:px-8"
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
          {banners.map((banner) => (
            <FeaturedCard key={banner.id} banner={banner} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};