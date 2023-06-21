import { Button } from "flowbite-react";
import { MdFileDownload } from "react-icons/md";
import useAnalyticsEventTracker from "../../shared/GoogleTagManager";
import { isMobileScreen } from "../../shared/isMobile";

type ResumeProps = {
  cv: string;
};

function Resume(props: ResumeProps) {
  let cv = new URL(`../../assets/${props.cv}`, import.meta.url).href;
  return (
    <div className="flex flex-col justify-start items-center space-y-4 text-black h-screen">
      <a
        href={cv}
        download
        onClick={() =>
          useAnalyticsEventTracker({
            category: "button",
            action: "download cv",
            label: "resume",
          })
        }
      >
        <Button>
          <MdFileDownload className="mr-2 h-5 w-5" />
          Download
        </Button>
      </a>
      {isMobileScreen() ? (
        <></>
      ) : (
        <iframe
          title="file"
          style={{ width: "60%", height: "100%" }}
          src={cv}
        />
      )}
    </div>
  );
}

export default Resume;
