import { ResearchData } from "../../models/ResearchData";
import "./ResearchItem.css";

function getArticleType(type: string) {
  switch (type) {
    case "journal":
      return "bg-purple-500 text-white";
    case "conference":
      return "bg-green-400 text-white";
    default:
      return "bg-gray-300 text-black";
  }
}

type ResearchItemProps = {
  research: ResearchData;
};

function ResearchItem(props: ResearchItemProps) {
  return (
    <a
      href={props.research.url}
      target="_blank"
      className={`flex flex-row px-8 py-3 space-y-4 bg-white rounded text-black w-5/6 no-underline research-item ${
        props.research.url ? "cursor-pointer" : ""
      } hover:scale-110 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col">
        <div className="text-lg flex flex-row">{props.research.title}</div>
        <span className="text-sm text-gray-400 italic">
          {props.research.authors}
        </span>
        <span className="text-sm font-semibold text-green-500 mt-2">
          <span
            className={`${getArticleType(
              props.research.type
            )} text-gray-700 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded mr-2 dark:bg-gray-700 dark:text-gray-300`}
          >
            <b>
              {props.research.type.charAt(0).toUpperCase() +
                props.research.type.slice(1)}
            </b>
          </span>
          {props.research.conferenceJournalTitle}
        </span>
      </div>
    </a>
  );
}

export default ResearchItem;
