import { AchievementData } from "../../models/AchievementsData";
import AchievementItem from "./AchievementItem";

type AchievementsProps = {
  achievements: AchievementData[];
};

function Achievements(props: AchievementsProps) {
  const achievements = [...props.achievements].reverse();
  return (
    <div className="flex-row justify-center">
      <div className="flex flex-wrap justify-center">
        {achievements.map((achievement) => (
          <AchievementItem key={achievement.title} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}

export default Achievements;
