import { motion } from "framer-motion";
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-24 h-24"
      >
        <img
          src="./public/optiAbstractlogo.png"
          alt="Loading..."
          className="w-20 object-contain"
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
