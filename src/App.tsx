import "./App.css";
import portfolio from "./assets/portfolio.png";
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
import useAnalyticsEventTracker from "./shared/GoogleTagManager";
import { isMobileScreen } from "./shared/isMobile";

function App() {
  const [value, setValue] = useState(0);
  const portfolioData = data as PortfolioData;
  const menuMappings = {
    0: "about",
    1: "projects",
    2: "achievements",
    3: "resume",
    4: "research",
    5: "bookshelf",
  };
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    useAnalyticsEventTracker({
      category: "link",
      action: "open from menu",
      label: menuMappings[newValue],
    });
  };

  const onClickHeaderLink = (link: string, event?) => {
    if (isMobileScreen()) {
      // on mobiles open link on second click
      if (!!event && !IsHoveringLink) {
        event.preventDefault();
        setIsHoveringLink(true);
      } else if (!!event && IsHoveringLink) {
        setIsHoveringLink(false);
      }
    }
    useAnalyticsEventTracker({
      category: "link",
      action: `open ${link}`,
      label: "header",
    });
  };

  const handleClickOutside = (event) => {
    // cancel hoveredLink states on click outside
    if (!IsHoveringLink) return;
    setIsHoveringLink(false);
  };

  const onClickHeaderLinkAuto = (link: string) => {
    onClickHeaderLink(link);
  };

  const [IsHoveringLink, setIsHoveringLink] = useState(false);
  const handleMouseOver = () => {
    setIsHoveringLink(true);
  };
  const handleMouseOut = () => {
    setIsHoveringLink(false);
  };

  return (
    <div className="App" onClick={handleClickOutside}>
      <div className="container flex flex-col justify-center">
        <div className="justify-center py-8 mt-4 xs:h-72 md:h-52 flex xs:flex-col md:flex-row items-center bg-green-500 rounded">
          <div className="flex w-30 h-30 ml-4 justify-center">
            <img
              className="aspect-square w-28 lg:w-48 rounded-full drop-shadow-md ring-4 ring-gray-300"
              src={portfolio}
              alt="Rounded avatar"
            />
          </div>

          <div className="container basis-3/5 pb-1">
            <p className="flex justify-center text-center mt-1 text-black font-bold text-3xl md:text-4xl lg:text-5xl">
              {portfolioData.header.name}
            </p>

            <p className="flex justify-center text-center font-bold text-base md:text-xl lg:text-2xl">
              {portfolioData.header.title}
            </p>

            <div className="container flex justify-center space-x-4">
              <SocialIcon
                link={"https://github.com/victorperezpiqueras"}
                color={"bg-black"}
                icon={
                  <AiFillGithub
                    color="white"
                    onClick={() => onClickHeaderLinkAuto("open github profile")}
                  />
                }
              />

              <SocialIcon
                link={
                  "https://www.linkedin.com/in/v%C3%ADctor-p%C3%A9rez-piqueras/"
                }
                color={"bg-blue-700"}
                icon={
                  <FaLinkedinIn
                    color="white"
                    onClick={() =>
                      onClickHeaderLinkAuto("open linkedin profile")
                    }
                  />
                }
              />

              <SocialIcon
                link={"https://orcid.org/0000-0002-2305-5755"}
                color={"bg-green-400"}
                icon={
                  <FaOrcid
                    color="white"
                    onClick={() => onClickHeaderLinkAuto("open orcid profile")}
                  />
                }
              />

              <a
                className={`mt-2`}
                href={
                  data.achievements.find((a) => a.image.includes("psm1"))?.url
                }
                target="_blank"
                onMouseOver={(e) => handleMouseOver()}
                onMouseOut={(e) => handleMouseOut()}
                onClick={(e) => onClickHeaderLink("open psm1", e)}
              >
                <button
                  type="button"
                  className={`psmi-button transition ease-in-out duration-300 hover:opacity-90 ${
                    IsHoveringLink
                      ? "scale-125 translate-x-6 -translate-y-1"
                      : ""
                  }`}
                >
                  <img
                    className={`psmi w-1/2 md:w-3/5 ${
                      isMobileScreen() ? "mt-2" : ""
                    }`}
                    src={psmii_logo}
                    alt=""
                  />
                </button>
              </a>
              <a
                href={
                  data.achievements.find((a) => a.image.includes("psm2"))?.url
                }
                target="_blank"
                onMouseOver={(e) => handleMouseOver()}
                onMouseOut={(e) => handleMouseOut()}
                onClick={(e) => onClickHeaderLink("open psm2", e)}
              >
                <button
                  type="button"
                  className={`psmi-button transition ease-in-out duration-300 hover:opacity-90 ${
                    IsHoveringLink
                      ? "scale-125  translate-x-20 translate-y-1"
                      : ""
                  }`}
                  style={{
                    marginLeft: "-5rem",
                  }}
                >
                  <img
                    className={`psmi w-1/2 md:w-3/5 ${
                      isMobileScreen() ? "mt-2" : ""
                    }`}
                    src={psmii_logo2}
                    alt=""
                  />
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <Box
            className="w-11/12 md:w-2/3"
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
              {!isMobileScreen() ? <Tab label="Bookshelf" /> : ""}
            </Tabs>
          </Box>
          <div className="w-full items-center">
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
