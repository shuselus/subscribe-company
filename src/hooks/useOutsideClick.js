import { useEffect } from "react";

const useOutsideClick = (arrRefs, callback) => {
  const handleClick = e => {
    if (arrRefs.every(ref => ref.current && !ref.current.contains(e.target))) {
      callback();
    }
};

useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;