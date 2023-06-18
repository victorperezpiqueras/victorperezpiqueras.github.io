import { useState } from "react";
import { AchievementData } from "../../models/AchievementsData";
import LoadingSpinner from "../../shared/components/LoadingSpinner/LoadingSpinner";
import useAnalyticsEventTracker from "../../shared/GoogleTagManager";

type AchievementProps = {
  achievement: AchievementData;
};

function AchievementItem(props: AchievementProps) {
  const [loading, setLoading] = useState(true);

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
          className={`rounded-t-lg w-96 h-72 object-cover ${
            achievement.url ? "hover:brightness-75" : ""
          } ${loading ? "hidden" : "visible"}`}
          src={
            new URL(
              `../../assets/achievements/${achievement.image}`,
              import.meta.url
            ).href
          }
          alt=""
          onLoad={() => {
            setLoading(false);
          }}
          onError={() => setLoading(false)}
        />
      </a>
      <div className="bg-green-500 h-1"></div>
      <div className="bg-white px-4 pt-4 pb-2 items-start rounded-b-lg">
        <p
          className="mb-3 font-normal text-gray-700"
          style={{
            minHeight: "80px",
          }}
        >
          {achievement.title}
        </p>
      </div>
    </div>
  );
}

export default AchievementItem;
