import { ResearchData } from "../../models/ResearchData";
import ResearchItem from "./ResearchItem";

type ResearchProps = {
  researches: ResearchData[];
};

function Research(props: ResearchProps) {
  const researches = [...props.researches].reverse();
  return (
    <div className="flex flex-col items-center space-y-4">
      {researches.map((research) => (
        <ResearchItem research={research} />
      ))}
    </div>
  );
}
export default Research;
