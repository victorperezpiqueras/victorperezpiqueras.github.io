import "./App.css";
import portfolio from "./assets/portfolio.jpg";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FaOrcid } from "react-icons/fa";
import SocialIcon from "./shared/components/SocialIcon/SocialIcon";
import psmii_logo from "./assets/psmi_logo.png";
import psmii_logo2 from "./assets/psmii_logo.png";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./shared/components/TabPanel/TabPanel";
import AboutMe from "./pages/AboutMe/AboutMe";
import Projects from "./pages/Projects/Projects";
import Bookshelf from "./pages/Bookshelf/Bookshelf";
import Resume from "./pages/Resume/Resume";
import data from "./assets/data.json";
import { PortfolioData } from "./models/PortfolioData";
import Achievements from "./pages/Achievements/Achievements";
import { useState, SyntheticEvent } from "react";
import Research from "./pages/Research/Research";
import ScrollToTopButton from "./shared/components/ScrollToTopButton/ScrollToTopButton";

function App() {
  const [value, setValue] = useState(0);
  const portfolioData = data as PortfolioData;
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className="App">
      <div className="container flex flex-col justify-center">
        <div className="container justify-center m-4 h-52 flex flex-row items-center bg-green-500 rounded">
          <div className="flex w-30 ml-12 justify-center">
            <img
              className="aspect-square w-28 lg:w-48 rounded-full drop-shadow-md ring-2 ring-gray-300"
              src={portfolio}
              alt="Rounded avatar"
            />
          </div>

          <div className="container basis-3/5">
            <p className="flex justify-center text-black font-bold text-2xl md:text-3xl lg:text-5xl">
              {portfolioData.header.name}
            </p>

            <p className="flex justify-center font-bold text-lg md:text-xl lg:text-2xl">
              {portfolioData.header.title}
            </p>

            <div className="container flex justify-center space-x-4">
              <SocialIcon
                link={"https://github.com/victorperezpiqueras"}
                color={"bg-black"}
                icon={<AiFillGithub color="white" />}
              />

              <SocialIcon
                link={
                  "https://www.linkedin.com/in/v%C3%ADctor-p%C3%A9rez-piqueras/"
                }
                color={"bg-blue-700"}
                icon={<FaLinkedinIn color="white" />}
              />

              <SocialIcon
                link={"https://orcid.org/0000-0002-2305-5755"}
                color={"bg-green-400"}
                icon={<FaOrcid color="white" />}
              />

              <a
                className={`mt-2`}
                href={
                  data.achievements.find((a) => a.image.includes("psm1"))?.url
                }
                target="_blank"
                onMouseOver={(e) => handleMouseOver()}
                onMouseOut={(e) => handleMouseOut()}
              >
                <button
                  type="button"
                  className={`psmi-button transition ease-in-out duration-300 hover:opacity-90 ${
                    isHovering ? "scale-125 translate-x-6 -translate-y-1" : ""
                  }`}
                >
                  <img className="psmi" src={psmii_logo} alt="" />
                </button>
              </a>
              <a
                href={
                  data.achievements.find((a) => a.image.includes("psm2"))?.url
                }
                target="_blank"
                onMouseOver={(e) => handleMouseOver()}
                onMouseOut={(e) => handleMouseOut()}
              >
                <button
                  type="button"
                  className={`psmi-button transition ease-in-out duration-300 hover:opacity-90 ${
                    isHovering ? "scale-125  translate-x-20 translate-y-1" : ""
                  }`}
                  style={{
                    marginLeft: "-5rem",
                  }}
                >
                  <img className="psmi" src={psmii_logo2} alt="" />
                </button>
              </a>
            </div>
          </div>
          <div className="basis-1/5"></div>
        </div>
        <div className="container flex flex-col w-full">
          <Box
            className="w-2/3"
            sx={{
              bgcolor: "white",
              alignSelf: "center",
              borderRadius: "10px",
              marginTop: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              sx={{ margin: "auto", color: "black" }}
            >
              <Tab label="About me" />
              <Tab label="Projects" />
              <Tab label="Achievements" />
              <Tab label="Resume" />
              <Tab label="Research" />
              <Tab label="My Bookshelf" />
            </Tabs>
          </Box>
          <div className="container w-full items-center">
            <TabPanel value={value} index={0}>
              <AboutMe aboutData={portfolioData.aboutMe} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Projects projects={portfolioData.projects} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Achievements achievements={portfolioData.achievements} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Resume cv={portfolioData.resume} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Research researches={portfolioData.researches} />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Bookshelf books={portfolioData.library} />
            </TabPanel>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
