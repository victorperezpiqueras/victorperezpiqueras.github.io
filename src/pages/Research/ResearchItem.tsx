import { ResearchData } from "../../models/ResearchData";
import "./ResearchItem.css";

type ResearchItemProps = {
  research: ResearchData;
};

function ResearchItem(props: ResearchItemProps) {
  return (
    <a
      href={props.research.url}
      target="_blank"
      className={`flex flex-row px-8 py-3 space-y-4 bg-white rounded text-black w-4/5 no-underline research-item ${
        props.research.url ? "cursor-pointer" : ""
      } hover:scale-110 transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col">
        <div className="text-lg flex flex-row">{props.research.title}</div>
        <span className="text-sm text-gray-400 italic">
          {props.research.authors}
        </span>
        <span className="text-sm font-semibold text-green-500">
          {props.research.conferenceJournalTitle}
        </span>
      </div>
    </a>
  );
}

export default ResearchItem;
