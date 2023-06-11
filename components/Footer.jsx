"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { socials } from "../constants";
import styles from "../styles";
import { footerVariants } from "../utils/motion";
import { TypingText } from "./CustomTexts";

const Footer = () => (
  <>
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative `}
    >
      <div className="footer-gradient" id="contact" />
      <div className={`${styles.innerWidth} mx-auto flex-col gap-8`}>
        <div className="flex flex-col mx-auto  p-10 rounded-3xl flex-wrap gap-5">
          <TypingText title="| Contact Me" textStyles="text-center" />
          <h4 className="font-bold md:text-[47px] text-center text-[35px] text-white">
            Get in touch
          </h4>
          <div className="grid border border-gray-500 p-10 justify-center gap-4 rounded-2xl shadow-lg shadow-gray-700 m-auto w-full md:w-1/2">
            <p className="font-normal text-[16px] text-white text-center">
              off.harsh07@gmail.com
            </p>
            <a
              type="button"
              className="flex hover:scale-105 transition duration-200 hover:font-bold items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]"
              href="mailto:off.harsh07@gmail.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src="/headset.svg"
                alt="headset"
                className="w-[24px] h-[24px] object-contain"
              />
              <span className="font-normal text-[16px] text-white">
                Send Email
              </span>
            </a>
            <div className="flex sm:hidden gap-4  items-center justify-center p-4">
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
      <div className="mt-[50px] h-[2px] bg-white opacity-10 " />
    </motion.footer>
    <div className="flex flex-col py-3 px-5 bg-black ">
      <div className="flex sm:flex-row flex-col  items-center justify-center  sm:justify-between flex-wrap gap-4">
        <Image
          src="/logo.png"
          alt="logo"
          className="w-[50px] border[] h-[40px]"
          width={50}
          height={40}
          priority
        />
        <h3 className="text-white font-semibold">Copyright ©2023</h3>
        <span className="text-white">Coded by Harsh Bansal</span>
      </div>
    </div>
  </>
);

export default Footer;
