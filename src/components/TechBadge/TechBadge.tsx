import { Badge } from "flowbite-react";
import { IconType } from "react-icons";
import { FaAngular, FaAws, FaPython } from "react-icons/fa";
import { SiServerless } from "react-icons/si";
import { SiFlask } from "react-icons/si";

type TechBadgeProps = {
  tech: string;
  className?: string;
};

const iconsMapping = new Map([
  [
    "angular",
    {
      icon: <FaAngular size={20} color={"red"} />,
      text: "Angular",
      color: "bg-red-200",
    },
  ],
  [
    "aws",
    {
      icon: <FaAws size={20} color={"orange"} />,
      text: "AWS",
      color: "bg-yellow-100",
    },
  ],
  [
    "python",
    {
      icon: <FaPython size={20} color={"yellow"} />,
      text: "Python",
      color: "bg-blue-400",
    },
  ],
  [
    "serverless",
    {
      icon: <SiServerless size={20} color={"red"} />,
      text: "Serverless",
      color: "bg-gray-100",
    },
  ],
  [
    "flask",
    {
      icon: <SiFlask size={20} color={"black"} />,
      text: "Flask",
      color: "bg-gray-100",
    },
  ],
]);

const getIcon = (tech: string): any => {
  return iconsMapping.get(tech);
};

function TechBadge(props: TechBadgeProps) {
  let icon = getIcon(props.tech);
  return (
    <span
      className={`${props.className} ${icon.color} text-gray-700 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300`}
    >
      {icon.icon}&nbsp;
      <b>{icon.text}</b>
    </span>
  );
}
/* <Badge icon={icon}>
      {props.tech.charAt(0).toUpperCase() + props.tech.slice(1)}
    </Badge> */
export default TechBadge;
