import { Button, type ButtonProps } from 'primereact/button';
import { motion } from 'framer-motion';

interface CTAButtonProps extends ButtonProps {
  label: string;
  level?: 'primary' | 'secondary';
}

const CTAButton = ({ label, level = 'primary', ...props }: CTAButtonProps) => {
  const baseClasses = "rounded-full font-bold px-8 py-3 text-lg border-none transition-all duration-300";
  
  const levelClasses = level === 'primary' 
    ? "bg-blue_green text-white hover:bg-blue_green-400" 
    : "bg-blue_green-200 text-white hover:bg-blue_green-300";

  return (
    <motion.div
      className="inline-block"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button 
        label={label} 
        className={`${baseClasses} ${levelClasses}`} 
        {...props} 
      />
    </motion.div>
  );
};

export default CTAButton;