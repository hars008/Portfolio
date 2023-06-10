"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnchorLink from "react-anchor-link-smooth-scroll";
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
    <AnchorLink href="#home">
      <h2 className="text-[20px] text-white flex gap-2 justify-end text-center p-6 pr-14 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-9 h-8 rotate-180"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z"
            clipRule="evenodd"
          />
        </svg>
      </h2>
    </AnchorLink>
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
