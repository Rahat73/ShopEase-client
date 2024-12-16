import { motion } from "framer-motion";

const AppLoading = () => {
  return (
    <div className="z-[999] w-full h-full flex justify-center items-center">
      <motion.span
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          times: [0, 0.25, 0.75, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="text-3xl italic font-extrabold text-default-700"
      >
        ShopEase
      </motion.span>
    </div>
  );
};

export default AppLoading;
