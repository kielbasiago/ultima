import { useEffect } from "react";

/** Removes light from html, adds dark and applies style  */
export const useDarkMode = () => {
  useEffect(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }, []);
};
