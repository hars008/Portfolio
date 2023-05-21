"use client";

import { motion } from "framer-motion";
import { socials } from "../constants";

import styles from "../styles";
import { footerVariants } from "../utils/motion";

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative `}
  >
    <div className="footer-gradient" id="contact" />
    <div className={`${styles.innerWidth} mx-auto flex-col gap-8`}>
      <div className="flex flex-col mx-auto border p-10 rounded-3xl items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-white">
          Get in touch
        </h4>
        <p className="font-normal text-[16px] text-white text-center">
          off.harsh07@gmail.com
        </p>
        <button
          type="button"
          className="flex hover:scale-105 transition duration-200 hover:font-bold items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]"
        >
          <img
            src="/headset.svg"
            alt="headset"
            className="w-[24px] h-[24px] object-contain"
          />
          <span className="font-normal text-[16px] text-white">Send Email</span>
        </button>
      </div>

      <div className="flex flex-col ">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center sm:hidden flex justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-white">
            Harsh Bansal
          </h4>
          <div className="flex gap-4 relative z-15">
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
                  className="w-[24px] h-[24px] hover:scale-105 transition duration-200 object-contain cursor-pointer"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
