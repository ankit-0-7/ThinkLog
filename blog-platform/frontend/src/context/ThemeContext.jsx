import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default to 'dark' or get the saved theme from localStorage
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // This effect runs whenever the 'theme' state changes
  useEffect(() => {
    // Add the current theme as a class to the body
    document.body.className = '';
    document.body.classList.add(theme);
    // Save the user's preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to easily use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};