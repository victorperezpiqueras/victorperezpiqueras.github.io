import { ResearchData } from "../../models/ResearchData";
import ResearchItem from "./ResearchItem";
import uuid from "react-uuid";

type ResearchProps = {
  researches: ResearchData[];
};

function Research(props: ResearchProps) {
  const researches = [...props.researches]
    .filter((research) => research.published)
    .reverse();
  return (
    <div className="flex flex-col items-center space-y-6">
      {researches.map((research: ResearchData) => (
        <ResearchItem research={research} key={uuid()} />
      ))}
    </div>
  );
}
export default Research;
