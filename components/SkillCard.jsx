"use client";

import React from "react";
import { AiFillHtml5 } from "react-icons/ai";
import { DiCss3 } from "react-icons/di";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiMysql,
  SiPython,
  SiCplusplus,
  SiSocketdotio,
  SiGit,
  SiBootstrap,
  SiVisualstudiocode,
  SiPostman,
  SiNetlify,
  SiVercel,
  SiGithub,
  SiFigma,
  SiUbuntu,
} from "react-icons/si";
import { FaNode, FaJava } from "react-icons/fa";
import { GiMongolia } from "react-icons/gi";
import { motion } from "framer-motion";
import { TypingText } from "./CustomTexts";
import { fadeIn, staggerContainer } from "../utils/motion";
import styles from "../styles";

const SkillCard = () => {
  const technologies = [
    {
      name: "HTML",
      icon: AiFillHtml5,
    },
    {
      name: "CSS",
      icon: DiCss3,
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
    },
    {
      name: "TypeScript",
      icon: SiTypescript,
    },
    {
      name: "React JS",
      icon: SiReact,
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
    },
    {
      name: "Node JS",
      icon: FaNode,
    },
    {
      name: "Express JS",
      icon: SiExpress,
    },
    {
      name: "MongoDB",
      icon: SiMongodb,
    },
    {
      name: "Next JS",
      icon: SiNextdotjs,
    },
    {
      name: "SQL",
      icon: SiMysql,
    },
    {
      name: "Python",
      icon: SiPython,
    },
    {
      name: "C++",
      icon: SiCplusplus,
    },
    {
      name: "Java",
      icon: FaJava,
    },
    {
      name: "Web Sockets",
      icon: SiSocketdotio,
    },
    {
      name: "Git",
      icon: SiGit,
    },
    {
      name: "Bootstrap",
      icon: SiBootstrap,
    },
  ];

  const toolsUsed = [
    {
      name: "VS Code",
      icon: SiVisualstudiocode,
    },
    {
      name: "Postman",
      icon: SiPostman,
    },
    {
      name: "MongoDB Atlas",
      icon: GiMongolia,
    },
    {
      name: "Netlify",
      icon: SiNetlify,
    },
    {
      name: "Vercel",
      icon: SiVercel,
    },
    {
      name: "Github",
      icon: SiGithub,
    },
    {
      name: "Figma",
      icon: SiFigma,
    },
    {
      name: "Ubuntu",
      icon: SiUbuntu,
    },
  ];

  return (
    <div className="grid items-center justify-center gap-8 w-full h-full px-4 py-8 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 md:px-6 md:py-12 md:flex-row">
      <TypingText title="| My Skills" />
      <div className="w-full  h-full mb-4 md:mb-0">
        <div className="flex items-center justify-center w-full h-full">
          <div className="max-w-lg ">
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
                <h2 className="text-2xl p-4 font-semibold text-center text-gray-800 dark:text-white md:text-3xl">
                  Technical Skills
                </h2>
              </motion.div>
            </motion.div>
            <div className="flex gap-14 flex-wrap justify-center mt-4 ">
              {technologies.map((technology, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-12 h-12 text-gray-800 rounded-full dark:text-white dark:bg-gray-800"
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
                        <p className=" p-2 text-sm mb-2 w-max">
                          {technology.name}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  h-full mb-4 md:mb-0 mt-4">
        <div className="flex items-center justify-center w-full h-full">
          <div className="max-w-lg ">
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
                <h2 className="text-2xl p-4 font-semibold text-center text-gray-800 dark:text-white md:text-3xl">
                  Tools I use
                </h2>
              </motion.div>
            </motion.div>
            <div className="flex gap-16 flex-wrap justify-center mt-4 ">
              {toolsUsed.map((technology, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-12 h-12 text-gray-800 rounded-full dark:text-white dark:bg-gray-800"
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
                        <p className=" p-2 text-sm mb-2 w-max">
                          {technology.name}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
