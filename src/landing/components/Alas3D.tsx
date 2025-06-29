import { motion } from "framer-motion";

const Alas3D = () => {
  return (
      <div style={{ perspective: 800 }}>
        <motion.img
          src="/alas.png"
          alt="Icono de Alas"
          className="w-16 h-16"
          animate={{ rotateY: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 4,
            ease: "linear",
          }}
        />
      </div>
  );
};

export default Alas3D;
