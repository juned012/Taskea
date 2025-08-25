import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { DefaultTheme } from "../utils/DefaultTheme";

const ToggleTheme = () => {
  const [theme, setTheme] = useState(DefaultTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-gray-300 dark:bg-stone-700 hover:bg-gray-400 dark:hover:bg-stone-600 
                               rounded-full p-2 transition text-gray-700 dark:text-gray-200"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ToggleTheme;
