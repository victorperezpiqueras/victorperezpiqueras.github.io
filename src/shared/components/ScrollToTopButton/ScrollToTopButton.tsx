import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTopButton() {
  const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // check if scrollY is less than 10%:
      setHideButton(window.scrollY < window.innerHeight * 0.1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      style={{ display: hideButton ? "none" : "block" }}
      className="fixed bottom-0 right-0 m-4 rounded-lg bg-green-500 hover:bg-green-600"
      onClick={handleClick}
    >
      <FaArrowUp className="text-white p-2" size={50} />
    </button>
  );
}

export default ScrollToTopButton;
