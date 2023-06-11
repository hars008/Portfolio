"use client";

import { motion } from "framer-motion";
import { TypingText } from "../components";

import styles from "../styles";
import { fadeIn, staggerContainer } from "../utils/motion";
import AnchorLink from "react-anchor-link-smooth-scroll";

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
        className="mt-[8px] font-normal sm:text-[20px] text-[16px] text-center text-secondary-white"
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
        has exposed me to a wide range of subjects, including DSA, DAA, OOPS,
        NoSQL, DBMS, and Data Science. This comprehensive education has provided
        me with a solid foundation in computer science principles and practical
        knowledge.
        <br />
        <br />
        In addition to my academic pursuits, I have honed my skills in various
        programming languages and frameworks, including C++, Java, Python,
        React, Next.js, Node.js, and Express.js. I have hands-on experience in
        developing{" "}
        <span className="font-extrabold text-white">
          Full Stack web applications{" "}
        </span>{" "}
        and working with databases like MongoDB and MySQL. My commitment to
        continuous learning and strong problem-solving skills enables me to stay
        updated with the latest technologies and industry trends.
        <br />
        <br />
        Thriving in challenging environments, I approach projects with
        dedication and enthusiasm. Eager to contribute to innovative software
        development, I bring dedication, motivation, and exceptional results.
        To <span className="font-extrabold text-white">explore</span> my projects, scroll down.
      </motion.p>

      <AnchorLink href="#projects">
        <motion.img
          variants={fadeIn("up", "tween", 0.3, 1)}
          src="/arrow-down.svg"
          alt="arrow down"
          className="w-[38px] h-[38px] object-contain mt-[28px] cursor-pointer hover:scale-120 border rounded-full p-2 animate-bounce transition duration-200"
        />
      </AnchorLink>
    </motion.div>
  </section>
);

export default About;
