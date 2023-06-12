"use client";

import Image from "next/image";

const Footer = () => (
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
);

export default Footer;
