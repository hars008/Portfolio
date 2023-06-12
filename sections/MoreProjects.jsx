"use client";

import { motion } from "framer-motion";

import styles from "../styles";
import { staggerContainer } from "../utils/motion";
import { MoreProjCard, TypingText } from "../components";

const ExtraProjects= () => {
  const projects = [
    {
      imgUrl: "/BankofBaroda.png",
      title: "Bank of Baroda - Virtual Branch",
      subtitle: [
        "-Technologies used: HTML, CSS, PHP, MySQL",
        "-description: A virtual branch of Bank of Baroda, where users can login and perform banking operations like deposit, withdrawal, transfer, etc. ",
      ],
      Links: [
        {
          url: "https://github.com/hars008/Bank-Site.git",
          val: "Github",
          img: "/github.png",
        },
      ],
    },
    {
      imgUrl: "/toDo.png",
      title: "To-Do List",
      subtitle: [
        "-Technologies used: React.Js, Node.Js, Express.Js",
        "-description: A to-do list where users can search the tasks, see its status and view the details of the user. ",
      ],
      Links: [
        {
          url: "https://github.com/hars008/to-do-List.git",
          val: "Github",
          img: "/github.png",
        },
        { url: "https://keen-muffin-b24056.netlify.app/", val: "Live Demo", img: "/live.svg" },
      ],
    },
  ];
  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Some More Projects" textStyles="text-center" />
        <div className="mt-[50px] flex flex-col gap-[30px]">
          {projects.map((item, index) => (
            <MoreProjCard key={`insight-${index}`} {...item} index={index + 1} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExtraProjects;
