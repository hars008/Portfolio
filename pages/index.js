import React from "react";
import { FloatButton } from "antd";
import { Footer, Navbar } from "../components";
import Sidebar from "../components/Sidebar";
import {
  About,
  Catalog,
  MyProjects,
  Hero,
  ExtraProjects,
  Skills,
  Contact,
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
      <Catalog />
    </div>
    <div className="relative">
      <MyProjects />
      <div className="gradient-04 z-0" />
    </div>
    <div className="relative">
      <ExtraProjects />
      <div className="gradient-04 z-0" />
    </div>
    <Contact />
    <Footer />
  </div>
);

export default Home;
