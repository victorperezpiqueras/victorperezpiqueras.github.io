import { AchievementData } from "../../models/AchievementsData";

type AchievementsProps = {
  achievements: AchievementData[];
};

function Achievements(props: AchievementsProps) {
  const achievements = [...props.achievements].reverse();
  return (
    <div className="flex-row justify-center">
      <div className="flex flex-wrap justify-center">
        {achievements.map((achievement) => (
          <div className="m-2.5 max-w-sm rounded-lg shadow-md">
            <a href={achievement.url} target="_blank">
              <img
                className={`rounded-t-lg ${
                  achievement.url ? "hover:brightness-75" : ""
                }`}
                src={
                  new URL(
                    `../../assets/achievements/${achievement.image}`,
                    import.meta.url
                  ).href
                }
                alt=""
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
        ))}
      </div>
    </div>
  );
}

export default Achievements;
