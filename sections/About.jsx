"use client";

import { motion } from "framer-motion";
import { TypingText } from "../components";

import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion";

const About = () => (
  <section id="about" className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Me" textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[20px] text-[20px] text-center text-secondary-white"
      >
        Hello, I am{" "}
        <span className="font-extrabold text-white">Harsh Bansal,</span> a
        highly skilled professional with a strong academic background and a
        passion for software development. My coursework in B.Tech
        <span className="font-extrabold text-white"> Computer Science </span>
        at{" "}
        <span className="font-extrabold text-white">
          {" "}
          PDPM IIITDM Jabalpur
        </span>{" "}
        has exposed me to a wide range of subjects, including Data Structures
        and Algorithms (DSA), Design and Analysis of Algorithms (DAA),
        Object-Oriented Programming (OOPS), NoSQL, Database Management Systems
        (DBMS), and Data Science. This comprehensive education has provided me
        with a solid foundation in computer science principles and practical
        knowledge.
        <br />
        In addition to my academic pursuits, I have honed my skills in various
        programming languages and frameworks, including C++, Java, Python,
        React, Next.js, Node.js, and Express.js. I have hands-on experience in
        developing{" "}
        <span className="font-extrabold text-white">
          Full Stack web applications{" "}
        </span>{" "}
        and working with databases like MongoDB and MySQL. My commitment to
        continuous learning enables me to stay updated with the latest
        technologies and industry trends.
        <br />
        My commitment to continuous learning and strong problem-solving skills
        drive my collaboration in cross-functional teams. Thriving in
        challenging environments, I approach projects with dedication and
        enthusiasm. Eager to contribute to innovative software development, I
        bring dedication, motivation, and exceptional results. Let's {" "}
        <span className="font-extrabold text-white">explore</span> more by
        scrolling down.
      </motion.p>

      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
