import "./StackedBadges.css";
import { useState } from "react";
import { isMobileScreen } from "../../isMobile";
import useAnalyticsEventTracker from "../../GoogleTagManager";
import { HeaderBadge } from "../../../models/HeaderBadge";
import OutsideClickHandler from "../OutsideClickHandler/OutsideClickHandler";

type StackedBadgesProps = {
  badges: HeaderBadge[];
  index: number;
};

function StackedBadges(props: StackedBadgesProps) {
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const onClickHeaderLink = (link: string, event) => {
    if (isMobileScreen()) {
      // on mobiles open link on second click
      if (!isHoveringLink) {
        setIsHoveringLink(true);
        event.preventDefault();
        return;
      } else {
        setIsHoveringLink(false);
        return;
      }
    }
    useAnalyticsEventTracker({
      category: "link",
      action: `open ${link}`,
      label: "header",
    });
  };

  const handleClickOutside = () => {
    // cancel hoveredLink states on click outside
    if (!isHoveringLink) return;
    setIsHoveringLink(false);
  };

  const getStylesByIndex = (index: number) => {
    const extraMarginLeft = isMobileScreen() ? -30 : -40;
    const extraTop = -4;

    const translateExtraXOffset = isMobileScreen() ? 12 : 14;

    const translateYOffset = -1;
    const translateExtraYOffset = 2;
    const translateYValue = translateYOffset + translateExtraYOffset * index;
    const translateYSign = translateYValue > 0 ? "" : "-";

    return {
      // on top if hovered, else each badge of a stack on top of previous one
      zIndex: isHoveringLink ? 10000 : 1000 + index,
      left: `${props.index == 0 ? 0 : 5}%`,
      marginLeft: `${extraMarginLeft * index}px`,
      top: `${extraTop * index}px`,
      translateX: `translate-x-${translateExtraXOffset * index}`,
      translateY: `${translateYSign}translate-y-${translateYValue}`,
    };
  };

  return (
    <OutsideClickHandler onOutsideClick={handleClickOutside}>
      {props.badges.map((badge, index) => (
        <a
          className={`inline-flex w-12 md:w-16 relative hover:opacity-90 transition ease-in-out duration-300 ${
            isHoveringLink
              ? `scale-125  ${getStylesByIndex(index).translateX} ${
                  getStylesByIndex(index).translateY
                }`
              : ""
          }`}
          href={badge.url}
          target="_blank"
          onMouseOver={() => setIsHoveringLink(true)}
          onMouseOut={() => setIsHoveringLink(false)}
          onClick={(e) => onClickHeaderLink(badge.url, e)}
          style={{
            top: getStylesByIndex(index).top,
            left: getStylesByIndex(index).left,
            zIndex: getStylesByIndex(index).zIndex,
            marginLeft: getStylesByIndex(index).marginLeft,
          }}
        >
          <button type="button" className={`stacked-badge-button`}>
            <img
              src={
                new URL(
                  `../../../assets/stackedBadges/${badge.img}`,
                  import.meta.url
                ).href
              }
              alt=""
            />
          </button>
        </a>
      ))}
    </OutsideClickHandler>
  );
}

export default StackedBadges;
