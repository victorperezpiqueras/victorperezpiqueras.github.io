import ReactGA from "react-ga4";

const useAnalyticsEventTracker = (
  config: {
    category: string;
    action: string;
    label: string;
  } = {
    category: "link",
    action: "open",
    label: "test",
  }
) => {
  ReactGA.event(config);
};
export default useAnalyticsEventTracker;
