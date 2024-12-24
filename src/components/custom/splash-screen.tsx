"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";

export const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#EFC95F]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <h1 className="text-4xl font-bold text-[#DCAC3B]">Wager</h1>
      </motion.div>
    </motion.div>
  );
};
