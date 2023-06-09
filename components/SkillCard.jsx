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
import { TypingText } from "./CustomTexts";

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
            <h2 className="text-2xl p-4 font-semibold text-center text-gray-800 dark:text-white md:text-3xl">
              Technical Skills
            </h2>
            <div className="flex gap-8 flex-wrap justify-center mt-4 space-x-8 md:justify-start">
              {technologies.map((technology, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-12 h-12 text-gray-800 rounded-full dark:text-white dark:bg-gray-800"
                >
                  {technology.icon ? (
                    <div className="flex flex-col hover:scale-105 transition duration-200 p-1 items-center justify-center">
                      <div className="mt-3">
                        <technology.icon size="35px" />
                      </div>
                      <p className=" p-2 text-sm mb-2 w-max">
                        {technology.name}
                      </p>
                    </div>
                  ) : (
                    <p>{technology.name}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  h-full mb-4 md:mb-0">
        <div className="flex items-center justify-center w-full h-full">
          <div className="max-w-lg ">
            <h2 className="text-2xl p-4 font-semibold text-center text-gray-800 dark:text-white md:text-3xl">
              Tools I use
            </h2>
            <div className="flex gap-8 flex-wrap justify-center mt-4 space-x-8 md:justify-start">
              {toolsUsed.map((technology, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-12 h-12 text-gray-800 rounded-full dark:text-white dark:bg-gray-800"
                >
                  {technology.icon ? (
                    <div className="flex flex-col hover:scale-105 transition duration-200 p-1 items-center justify-center">
                      <div className="mt-3">
                        <technology.icon size="35px" />
                      </div>
                      <p className=" p-2 text-sm mb-2 w-max">
                        {technology.name}
                      </p>
                    </div>
                  ) : (
                    <p>{technology.name}</p>
                  )}
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
