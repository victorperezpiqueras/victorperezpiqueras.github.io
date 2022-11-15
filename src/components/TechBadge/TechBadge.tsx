import { FaAngular, FaAws, FaPython } from "react-icons/fa";
import { SiServerless } from "react-icons/si";
import { SiFlask } from "react-icons/si";
import TechIcon from "../TechIcon/TechIcon";

type TechBadgeProps = {
  tech: string;
  className?: string;
};

const iconsMapping = new Map([
  [
    "angular",
    {
      text: "Angular",
      color: "bg-red-200",
    },
  ],
  [
    "aws",
    {
      text: "AWS",
      color: "bg-yellow-100",
    },
  ],
  [
    "python",
    {
      text: "Python",
      color: "bg-blue-400",
    },
  ],
  [
    "serverless",
    {
      text: "Serverless",
      color: "bg-orange-100",
    },
  ],
  [
    "flask",
    {
      text: "Flask",
      color: "bg-gray-100",
    },
  ],
  [
    "nodejs",
    {
      text: "NodeJS",
      color: "bg-green-100",
    },
  ],
  [
    "mysql",
    {
      text: "MySQL",
      color: "bg-blue-100",
    },
  ],
  [
    "raspberrypi3",
    {
      text: "Raspberry Pi 3",
      color: "bg-pink-100",
    },
  ],
  [
    "ue4",
    {
      text: "Unreal Engine 4",
      color: "bg-gray-300",
    },
  ],
  [
    "vive",
    {
      text: "HTC VIVE",
      color: "bg-purple-200",
    },
  ],
  [
    "cardboard",
    {
      text: "Google Cardboard",
      color: "bg-orange-100",
    },
  ],
  [
    "javascript",
    {
      text: "JavaScript",
      color: "bg-yellow-100",
    },
  ],
  [
    "html",
    {
      text: "HTML5",
      color: "bg-orange-100",
    },
  ],
  [
    "css",
    {
      text: "CSS3",
      color: "bg-blue-100",
    },
  ],
  [
    "bootstrap",
    {
      text: "Bootstrap",
      color: "bg-purple-100",
    },
  ],
  [
    "mongodb",
    {
      text: "MongoDB",
      color: "bg-gray-100",
    },
  ],
]);

const getIcon = (tech: string) => {
  return iconsMapping.get(tech);
};

function TechBadge(props: TechBadgeProps) {
  let icon = getIcon(props.tech);
  icon = icon ? icon : { text: props.tech, color: "bg-gray-100" };
  return (
    <span
      className={`${props.className} ${icon.color} text-gray-700 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded mr-2 dark:bg-gray-700 dark:text-gray-300`}
    >
      <TechIcon tech={props.tech} size="23px" /> &nbsp;
      <b>{icon.text}</b>
    </span>
  );
}

export default TechBadge;
