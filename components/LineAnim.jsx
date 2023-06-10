import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "../utils/motion";

const LineAnim = () => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }}
    className={` mx-auto flex lg:flex-row flex-col gap-8`}
  >
    <motion.div
      variants={fadeIn("right", "tween", 0.2, 1)}
      className="flex-[0.95] flex justify-center flex-col"
    >
      <div className=" w-9/12 m-auto my-16 border-b border-gray-500 " />
    </motion.div>
  </motion.div>
);

export default LineAnim;
