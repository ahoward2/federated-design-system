import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

export const useThemeMode = (initialTheme: ThemeMode) => {
  const [theme, setTheme] = useState(initialTheme);

  const setMode = (mode: ThemeMode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const themeToggler = () =>
    theme === "dark" ? setMode("light") : setMode("dark");

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as ThemeMode;
    localTheme && setTheme(localTheme);
  }, []);

  return { theme, themeToggler };
};

export default useThemeMode;
