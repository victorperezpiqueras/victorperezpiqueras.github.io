// get if is mobile if screen width is less than 768px
export const isMobileScreen = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }
  return false;
};
