"use client";

import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import Image from "next/image";
import { navVariants } from "../utils/motion";
import styles from "../styles";

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative z-50`}
  >
    <div className="absolute  w-fit inset-0 gradient-01" />
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
      <Image
        src="/logo.png"
        alt="logo"
        className="w-[50px] h-[40px]"
        width={50}
        height={40}
        priority
      />

      <div className=" flex gap-6 lg:gap-32 text-[16px] leading-[45.24px] text-white">
        <AnchorLink href="#about">
          <h3 className="hover:font-extrabold hover:drop-shadow-xl transition duration-300 cursor-pointer">
            {" "}
            About
          </h3>
        </AnchorLink>
        <AnchorLink href="#projects">
          <h3 className="hover:font-extrabold hover:drop-shadow-xl transition duration-300 cursor-pointer">
            {" "}
            Projects
          </h3>
        </AnchorLink>
        <AnchorLink href="#contact">
          <h3 className="hover:font-extrabold hover:drop-shadow-xl transition duration-300 cursor-pointer">
            {" "}
            Contact
          </h3>
        </AnchorLink>
      </div>
      <button
        type="button"
        className="bg-blue-500 p-2 rounded-lg hover:scale-110 transition duration-300 ease-in-out text-white"
        onClick={() => {
          window.open(
            "https://drive.google.com/file/d/1bVgUu1P8GKjGiVTII8TbEWZFa4a6ORb2/view?usp=share_link",
          );
        }}
      >
        Resume
      </button>
    </div>
  </motion.nav>
);

export default Navbar;
