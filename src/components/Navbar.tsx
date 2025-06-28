import { motion } from "motion/react";
import { Button } from "primereact/button";

interface NavbarProps {
  onNavigateToDashboard: () => void;
  onLogoClick: () => void;
}

export const Navbar = ({ onNavigateToDashboard, onLogoClick }: NavbarProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={onLogoClick}>
            <span className="text-2xl font-bold text-blue_green-200">
              A.L.A.S.
            </span>
          </div>
          <div className="ml-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                label="Conocer más"
                icon="pi-arrow-right"
                iconPos="right"
                className="bg-blue_green text-blue_green-100 font-bold border-none rounded-lg py-3 px-5 shadow-md hover:brightness-105"
                onClick={onNavigateToDashboard}
              />
            </motion.div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
