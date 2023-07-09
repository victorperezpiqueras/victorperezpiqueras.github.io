import { useRef, useEffect } from "react";

function OutsideClickHandler({ onOutsideClick, children }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    /**
     * Handle outside click event
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return <span ref={wrapperRef}>{children}</span>;
}

export default OutsideClickHandler;
