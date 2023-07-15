"use client";

import React from "react";
import { motion } from "framer-motion";
import { socials } from "../constants";
import { navVariants } from "../utils/motion";

const Sidebar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className="px-3 py-8 h-full hidden sm:block fixed top-0 z-50"
  >
    <div className="  w-fit  inset-0 gradient-01 " />
    <div className="w-full h-full flex  flex-col justify-center  gap-8">
      {socials.map((social) => (
        <a
          href={social.link}
          target="_blank"
          key={social.name}
          rel="noreferrer"
        >
          <img
            src={social.url}
            alt={social.name}
            className="w-[24px] h-[24px] hover:scale-[1.2] hover:shadow-white-2xl transition duration-200 ease-in-out object-contain cursor-pointer"
          />
        </a>
      ))}
    </div>
  </motion.nav>
);
export default Sidebar;
