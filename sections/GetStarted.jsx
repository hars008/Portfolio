"use client";

import BriefProjOne from "../components/BriefProjOne";
import BriefProjTwo from "../components/BriefProjTwo";
import LineAnim from "../components/LineAnim";

const GetStarted = () => {
  const bookingFeatures = [
    "Tools & technologies used: ViteJS, ReactJS, NodeJs, ExpressJs, MongoDB, TailWind CSS",
    "Full-stack web app having authorization/registration, and booking API, wrapped in a responsive frontend.",
  ];
  const visualizationFeatures = [
    "Tools & technologies used: NextJS, Tailwind CSS, Chart.js, MongoDB.",
    "Visualizing data in line and bar graphs using javascript and charting library.",
  ];
  const stoneFeatures = [
    "Tools & technologies used: ReactJS, CSS",
    "A Complete Front-end Based React app to play and get updated scores with Transitions.",
  ];
  const solrideeFeatures = [
    "Tools & technologies used: HTML, CSS, PHP, SQL, Bootstrap",
    "Full Stack Web App with user and admin side, creating an online environment to rent and book cycles.",
  ];
  const moviesFeatures = [
    "Tools & technologies used: ReactJS, NodeJs, ExpressJs, MongoDB",
    "Full Stack Web App to search and get details of movies and series, according to user's interest.",
  ];

  return (
    <>
      <LineAnim />
      <BriefProjTwo
        projTitle="Booking App"
        featuresPoints={bookingFeatures}
        imgClip="/bookingApp.png"
        ID="proj-1"
        Links={[
          {
            img: "/github.png",
            url: "https://github.com/hars008/bookingApp",
            title: "Github Link",
          },
        ]}
      />

      <LineAnim />

      <BriefProjOne
        projTitle="Data Visualization"
        featuresPoints={visualizationFeatures}
        imgClip="/dataVisualization.png"
        ID="proj-2"
        Links={[
          {
            img: "/github.png",
            url: "https://github.com/hars008/ekko",
            title: "Github Link",
          },
          {
            img: "/live.svg",
            url: "https://main--resplendent-lebkuchen-a23f08.netlify.app/",
            title: "Live Demo",
          },
        ]}
      />

      <LineAnim />

      <BriefProjTwo
        projTitle="Stone Paper Scissors Game"
        featuresPoints={stoneFeatures}
        imgClip="/stonePaperScissor.png"
        ID="proj-3"
        Links={[
          {
            img: "/github.png",
            url: "https://github.com/hars008/stone-paper-scissors",
            title: "Github Link",
          },
          {
            img: "/live.svg",
            url: "https://hars008.github.io/stone-paper-scissors/",
            title: "Live Demo",
          },
        ]}
      />

      <LineAnim />

      <BriefProjOne
        projTitle="Solridee - Solution to your ride"
        featuresPoints={solrideeFeatures}
        imgClip="/solridee.png"
        ID="proj-4"
        Links={[
          {
            img: "/github.png",
            url: "https://github.com/hars008/solridee",
            title: "Github Link",
          },
        ]}
      />

      <LineAnim />

      <BriefProjTwo
        projTitle="Moviesverse - Movie App"
        featuresPoints={moviesFeatures}
        imgClip="/moviesverse.png"
        ID="proj-5"
        Links={[
          {
            img: "/github.png",
            url: "https://github.com/hars008/hackathon",
            title: "Github Link",
          },
        ]}
      />

      <LineAnim />
    </>
  );
};

export default GetStarted;
