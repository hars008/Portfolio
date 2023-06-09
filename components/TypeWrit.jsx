import React from "react";
import Typewriter from "typewriter-effect";

const Type = () => (
  <Typewriter
    options={{
      strings: [
        "Software Developer",
        "Freelancer",
        "MERN Stack Developer",
        "Open Source Contributor",
        "Full Stack Developer",
      ],
      autoStart: true,
      loop: true,
      deleteSpeed: 30,
    }}
  />
);

export default Type;
