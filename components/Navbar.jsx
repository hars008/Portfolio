"use client";

import React, { useState } from "react";
import { MenuOutlined, CloseCircleTwoTone } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import Image from "next/image";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import styles from "../styles";
import { navVariants } from "../utils/motion";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      id="home"
      className={`${styles.xPaddings} py-4 relative bg-black bg-opacity-20 w-full fixed top-0 z-50`}
    >
      <div className="absolute  w-fit inset-0 gradient-01" />
      <div
        className={`${styles.innerWidth} mx-auto flex justify-between sm:gap-8 gap-4`}
      >
        <Image
          src="/logo.png"
          alt="logo"
          className="w-[50px] h-[40px]"
          width={50}
          height={40}
          priority
        />

        <div className=" sm:flex sm:gap-6 hidden gap-2 lg:gap-32 text-[16px] leading-[45.24px] text-white">
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
          className="bg-blue-500 p-2 hidden sm:flex rounded-lg hover:scale-110 transition duration-300 ease-in-out text-white"
          onClick={() => {
            window.open(
              "https://drive.google.com/file/d/1bVgUu1P8GKjGiVTII8TbEWZFa4a6ORb2/view?usp=share_link",
            );
          }}
        >
          Resume
        </button>
        <div className="sm:hidden">
          <Button
            type="primary"
            onClick={showDrawer}
            className="bg-blue-500 rounded-lg hover:scale-110 transition duration-300 ease-in-out text-white"
          >
            <MenuOutlined style={{ fontSize: "19px" }} />
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable
            onClose={onClose}
            closeIcon={(
              <CloseCircleTwoTone
                style={{ fontSize: "26px", color: "#08c" }}
                className="hover:scale-[1.3] transition duration-200"
              />
            )}
            open={visible}
            className="text-center  text-white opacity-90 !bg-gradient-to-r !to-black !from-zinc-900 "
            headerStyle={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            <div className=" flex flex-col sm:gap-6 gap-2 lg:gap-32 text-[16px] leading-[45.24px] text-white ">
              <AnchorLink onClick={onClose} href="#about">
                <h3 className="hover:font-extrabold hover:drop-shadow-xl transition duration-300 cursor-pointer">
                  {" "}
                  About
                </h3>
              </AnchorLink>
              <AnchorLink onClick={onClose} href="#projects">
                <h3 className="hover:font-extrabold hover:drop-shadow-xl transition duration-300 cursor-pointer">
                  {" "}
                  Projects
                </h3>
              </AnchorLink>
              <AnchorLink onClick={onClose} href="#contact">
                <h3 className="hover:font-extrabold hover:drop-shadow-xl transition duration-300 cursor-pointer">
                  {" "}
                  Contact
                </h3>
              </AnchorLink>

              <button
                type="button"
                className="bg-blue-500 p-2 w-fit m-auto px-10 mt-4 rounded-lg hover:scale-110 transition duration-300 ease-in-out text-white"
                onClick={() => {
                  setVisible(false);
                  window.open(
                    "https://drive.google.com/file/d/1bVgUu1P8GKjGiVTII8TbEWZFa4a6ORb2/view?usp=share_link",
                  );
                }}
              >
                Resume
              </button>
            </div>
          </Drawer>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
