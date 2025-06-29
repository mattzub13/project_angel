import { useState, useEffect } from 'react';

interface AnimatedProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  duration?: number;
}

const AnimatedProgressBar = ({ 
  value, 
  max = 100, 
  className = "", 
  duration = 2000 
}: AnimatedProgressBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    setAnimatedValue(0);
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * value);
      
      setAnimatedValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  const percentage = (animatedValue / max) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-300 ease-out shadow-lg"
          style={{ 
            width: `${percentage}%`
          }}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-semibold text-blue-800">Puntaje:</span>
        <span className="text-sm font-bold text-blue-900">
          {animatedValue}%
        </span>
      </div>
    </div>
  );
};

export default AnimatedProgressBar; 