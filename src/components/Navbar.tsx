import { motion } from "motion/react";
import { Button } from "primereact/button";


export const Navbar = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-100 py-1">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer">
            <span className="text-4xl font-bold ">
              ALAS
            </span>
          </div>
          <div className="ml-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                label="Conocer más"
                icon="pi pi-arrow-right"
                iconPos="right"
                className="bg-cream text-blue_green-100 font-bold border-none rounded-lg py-2 px-5 shadow-md hover:brightness-105"

              />
            </motion.div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
