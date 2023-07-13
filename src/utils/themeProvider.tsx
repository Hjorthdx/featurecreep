import React, { ReactNode, useState } from 'react';

const initialState = {
  theme: true,
  toggleTheme: () => { },
};

interface Theme {
  theme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<Theme>(initialState);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(false);

  const toggleTheme = () => {
    setTheme(prevTheme => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};