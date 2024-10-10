import { Sun, Moon } from 'lucide-react';

type DarkModeToggleProps = {
  darkMode: boolean;
  setDarkMode: () => void;
}

const DarkModeToggle = ({ darkMode, setDarkMode }: DarkModeToggleProps) => {
  return (
    <button 
      className="absolute top-4 right-4 p-2 rounded-full shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
      onClick={setDarkMode}
    >
      {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
};

export default DarkModeToggle;
