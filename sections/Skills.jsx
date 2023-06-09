"use client";

import { motion } from "framer-motion";
import styles from "../styles";
import { staggerContainer, fadeIn } from "../utils/motion";
import { SkillCard } from "../components";


const Skills = () => {
  return (
    <>
      <section className={`${styles.paddings}`}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
        >
          <motion.div
            variants={fadeIn("left", "tween", 0.2, 1)}
            className="flex-[0.95] flex text-center justify-center flex-col"
          >
            <SkillCard />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Skills;
