import { useState, useEffect } from "react";

const ThemeToggler = () => {
  const [theme, setTheme] = useState("dark");
  const nextTheme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <button onClick={() => setTheme(nextTheme)}>
      Change to {nextTheme} mode
    </button>
  );
};

export default ThemeToggler;
