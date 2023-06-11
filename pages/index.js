import React from "react";
import { FloatButton } from "antd";
import { Footer, Navbar } from "../components";
import Sidebar from "../components/Sidebar";
import {
  About,
  Explore,
  GetStarted,
  Hero,
  Insights,
  Skills,
} from "../sections";

const Home = () => (
  <div className="bg-primary-black overflow-hidden">
    <Navbar />
    <Sidebar />
    <Hero />
    <div className="relative">
      <About />
      <FloatButton.BackTop className="bg-white hover:scale-110 transition duration-200 " />
      <div className="gradient-03 z-0" />
      <Skills />
      <Explore />
    </div>
    <div className="relative">
      <GetStarted />
      <div className="gradient-04 z-0" />
      {/* <WhatsNew /> */}
    </div>
    {/* <World /> */}
    <div className="relative">
      <Insights />
      <div className="gradient-04 z-0" />
      {/* <Feedback /> */}
    </div>
    <Footer />
  </div>
);

export default Home;
