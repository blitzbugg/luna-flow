import React, { createContext, useContext, ReactNode } from 'react';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

const ThemeContext = createContext({
  colors,
  spacing,
  typography,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={{ colors, spacing, typography }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
