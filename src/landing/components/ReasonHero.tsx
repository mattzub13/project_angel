import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
};

// Updated variants for the icon to shrink, move up, and become partially transparent
const iconVariants = {
    visible: { opacity: 1, scale: 1, y: 0 }, // Initial state: full size, no vertical offset, full opacity
    // On hover/exit: partially fade, shrink to 50%, move up 20px
    hidden: {  scale: 0.5, y: -40 }, // Changed opacity from 0 to 0.2
};
export const ReasonHero = ({ icon, title }: { icon: string, title: string }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="bg-light_blue py-6 w-full rounded-xl flex flex-col px-5 justify-center items-center overflow-hidden relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ minHeight: '150px' }} // Ensure consistent height
        >
            <AnimatePresence mode='wait'> {/* Use mode='wait' to ensure icon fades out before text fades in */}
                <motion.i
                    key="icon" // Essential for AnimatePresence to track
                    className={`${icon} text-4xl mb-2`}
                    variants={iconVariants}
                    // Animate based on whether it's hovered or not
                    animate={isHovered ? "hidden" : "visible"}
                    transition={{ duration: 0.2 }}
                    style={{ position: 'absolute' }} // Important for `y` and `scale` transforms to work correctly
                />


                {isHovered && ( // Conditionally render the text based on isHovered
                    <motion.p
                        key="text" // Assign a unique key for AnimatePresence to track
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.4 }}
                        className="text-center absolute top-8 left-0 right-0 p-4" // Text always positioned at the bottom
                    >
                        {title}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
