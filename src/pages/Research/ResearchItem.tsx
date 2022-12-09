import { FaFilePdf } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { ResearchData } from "../../models/ResearchData";

type ResearchItemProps = {
  research: ResearchData;
};

function ResearchItem(props: ResearchItemProps) {
  return (
    <div className="flex flex-row px-4 pb-3 space-y-4 bg-white rounded text-black w-4/5 gap-3">
      <div className="flex w-1/8 items-center">
        <a
          href={
            new URL(
              `../../assets/researchFiles/${props.research.pdf}.pdf`,
              import.meta.url
            ).href
          }
          target="_blank"
        >
          <FaFilePdf
            className="text-4xl hover:cursor-pointer transition ease-in-out duration-300 hover:scale-105"
            color="rgb(226, 0, 0)"
          />
        </a>
      </div>

      <div className="flex flex-col">
        <div className="text-lg flex flex-row">
          {props.research.title}
          {props.research.url ? (
            <a href={props.research.url} target="_blank">
              <FiExternalLink
                color="green"
                className="ml-1 hover:cursor-pointer"
              />
            </a>
          ) : (
            ""
          )}
        </div>
        <span className="text-sm text-gray-400 italic">
          {props.research.authors}
        </span>
        <span className="text-sm font-semibold text-green-500">
          {props.research.conferenceJournalTitle}
        </span>
      </div>
    </div>
  );
}

export default ResearchItem;
