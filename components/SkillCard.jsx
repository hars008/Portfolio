"use client";

import React from "react";
import { motion } from "framer-motion";
import { TypingText } from "./CustomTexts";
import { fadeIn, staggerContainer } from "../utils/motion";
import styles from "../styles";
import { technologies, toolsUsed } from "../constants";

const SkillCard = () => (
  <div className="grid items-center justify-center gap-8 w-full h-full px-4 py-8 mx-auto rounded-lg shadow-md bg-gray-800 md:px-6 md:py-12 md:flex-row">
    <TypingText title="| My Skills" />
    <div className="flex flex-col gap-4 items-center justify-center w-full w-full max-w-lg h-full mb-4 md:mb-0 h-full">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
      >
        <motion.div
          variants={fadeIn("left", "tween", 0.1, 1)}
          className="mt-[8px] font-normal sm:text-[20px] text-[16px] text-center text-secondary-white"
        >
          <h2 className="text-2xl p-4 font-semibold text-center text-white md:text-3xl">
            Technical Skills
          </h2>
        </motion.div>
      </motion.div>
      <div className="flex gap-14 flex-wrap justify-center mt-4 ">
        {technologies.map((technology, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-12 h-12 rounded-full text-white dark:bg-gray-800"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
            >
              <motion.div
                variants={fadeIn("up", "tween", 0.2, 1)}
                className="mt-[8px] font-normal sm:text-[20px] text-[16px] text-center text-secondary-white"
              >
                <div className="flex flex-col hover:scale-105 transition duration-200 p-1 items-center justify-center">
                  <div className="mt-3">
                    <technology.icon size="35px" />
                  </div>
                  <p className=" p-2 text-sm mb-2 w-max">{technology.name}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-4 max-w-lg w-full h-full mb-4 md:mb-0 mt-4 items-center justify-center w-full h-full">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
      >
        <motion.div
          variants={fadeIn("right", "tween", 0.1, 1)}
          className="mt-[8px] font-normal sm:text-[20px] text-[16px] text-center text-secondary-white"
        >
          <h2 className="text-2xl p-4 font-semibold text-center text-white md:text-3xl">
            Tools I use
          </h2>
        </motion.div>
      </motion.div>
      <div className="flex gap-16 flex-wrap justify-center mt-4 ">
        {toolsUsed.map((technology, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-12 h-12 rounded-full text-white dark:bg-gray-800"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
            >
              <motion.div
                variants={fadeIn("up", "tween", 0.2, 1)}
                className="mt-[8px] font-normal sm:text-[20px] text-[16px] text-center text-secondary-white"
              >
                <div className="flex flex-col hover:scale-105 transition duration-200 p-1 items-center justify-center">
                  <div className="mt-3">
                    <technology.icon size="35px" />
                  </div>
                  <p className=" p-2 text-sm mb-2 w-max">{technology.name}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SkillCard;
