"use client";

import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import styles from "../styles";
import MovingComponent from "react-moving-text";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";
import Particle from "../components/Particle";
const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6 mb-64`}>
    <Particle />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <div className="flex justify-center  items-center flex flex-col sm:flex-row relative">
        <motion.h1
          variants={textVariant(0.6)}
          className="text-[30px] text-white"
        >
          Hi, I am &nbsp;
        </motion.h1>

        <motion.h1 variants={textVariant(0.8)} className={styles.heroHeading}>
         
            Harsh&nbsp;
        </motion.h1>
        <motion.div
          variants={textVariant(1)}
          className="flex flex-row justify-center items-center"
        >
          <h1 className={styles.heroHeading}>
            Bansal&nbsp;
            </h1>
        </motion.div>
      </div>

      <motion.div
        variants={slideIn("right", "tween", 1.3, 1)}
        className="relative w-full md:-mt-[20px] -mt-[12px]"
      >
        <h2 className="text-[20px] text-white text-center  py-2 mr-10">
          Full-stack developer with strong problem-solving skills,
          committed to deliver innovative solutions and tackle complex web
          development challenges.
        </h2>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 1.4, 1)}
        className="relative w-full md:-mt-[20px] -mt-[12px]"
      >
        <AnchorLink href="#about">
          <h2 className="text-[20px] text-white flex gap-2 text-center mx-auto w-fit mt-32 animate-bounce">
            Scroll Down
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-8"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
                clipRule="evenodd"
              />
            </svg>
          </h2>
        </AnchorLink>
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
