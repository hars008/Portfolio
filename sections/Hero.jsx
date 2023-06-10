"use client";

import { motion } from "framer-motion";
import AnchorLink from "react-anchor-link-smooth-scroll";
import styles from "../styles";
import Type from "../components/TypeWrit";
import { fadeIn, slideIn, staggerContainer, textVariant } from "../utils/motion";
import Particle from "../components/Particle";
const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6 my-32 `}>
    <Particle />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <div className="md:flex xl:justify-center xl:gap-10 justify-between sm:px-5 md:px-7 lg:px-12 ">
        <div className="flex justify-center sm:gap-1 gap-4  items-center flex-col relative">
          <motion.h1
            variants={textVariant(0.6)}
            className="sm:text-[30px] text-[18px] text-white"
          >
            Hi There!&nbsp;
            <span className="wave" role="img" aria-labelledby="wave">
              👋🏻
            </span>
          </motion.h1>
          <motion.h1
            variants={textVariant(0.6)}
            className="sm:text-[27px] text-[18px] text-white"
          >
            I&nbsp;am&nbsp;
            <span className="sm:text-[36px] text-[22px] font-bold">
              Harsh&nbsp;Bansal
            </span>
          </motion.h1>

          <motion.div
            initial="hidden"
            whileInView={"show"}
            variants={fadeIn("left", "tween", 0.6, 1)}
            className="relative w-full md:-mt-[20px] -mt-[12px]"
          >
            <h2 className="sm:text-[20px] text-[14px] font-bold text-white text-center  py-2 mr-10">
              <Type />
            </h2>
          </motion.div>
        </div>
        <div>
          <motion.div
            variants={textVariant(0.6)}
            className="text-center xl:w-[700px] lg:w-[600px] md:w-[500px] sm:mt-14 sm:w-[490px] w-[350px] mx-auto"
          >
            <img src="portfolio.png" alt="clipart" />
          </motion.div>
        </div>
      </div>
      <motion.div
        variants={fadeIn("right", "tween", 1.0, 1)}
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
