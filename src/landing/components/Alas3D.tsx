import { motion } from "framer-motion";

const Alas3D = () => {
  return (
    <div className="flex flex-col items-center cursor-pointer group">
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
    </div>
  );
};

export default Alas3D;
