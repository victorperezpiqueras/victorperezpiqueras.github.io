import { useState } from "react";
import { AchievementData } from "../../models/AchievementsData";
import LoadingSpinner from "../../shared/components/LoadingSpinner/LoadingSpinner";
import useAnalyticsEventTracker from "../../shared/GoogleTagManager";

type AchievementProps = {
  achievement: AchievementData;
};

function AchievementItem(props: AchievementProps) {
  const [loading, setLoading] = useState(true);
  const [displayFullImage, setDisplayFullImage] = useState(false);

  function getImageSize(imageData) {
    const width = imageData.nativeEvent.srcElement.width;
    const height = imageData.nativeEvent.srcElement.height;
    // display full if ratio is less than 1:1 (not h-rectangular)
    setDisplayFullImage(width / height <= 1);
  }

  const { achievement } = props;
  return (
    <div className="m-2.5 max-w-sm rounded-lg shadow-md">
      <a
        href={achievement.url}
        target="_blank"
        onClick={() => {
          if (props.achievement.url) {
            useAnalyticsEventTracker({
              category: "link",
              action: `open ${props.achievement.url}`,
              label: "achievements",
            });
          }
        }}
      >
        {loading && <LoadingSpinner size="xl" />}
        <img
          className={`rounded-t-lg w-96 h-72 ${
            displayFullImage ? "object-contain" : "object-cover"
          }  bg-white ${achievement.url ? "hover:brightness-75" : ""} ${
            loading ? "hidden" : "visible"
          }`}
          src={
            new URL(
              `../../assets/achievements/${achievement.image}`,
              import.meta.url
            ).href
          }
          alt=""
          onLoad={(imageData) => {
            setLoading(false);
            getImageSize(imageData);
          }}
          onError={() => setLoading(false)}
        />
      </a>
      <div className="bg-green-500 h-1"></div>
      <div className="bg-white px-4 pt-4 pb-2 items-start rounded-b-lg">
        <p
          className="mb-3 font-normal text-gray-700"
          style={{
            minHeight: "60px",
          }}
        >
          {achievement.title}
        </p>
      </div>
    </div>
  );
}

export default AchievementItem;
