
import { createContext, ReactNode, useContext, useState } from 'react';

export type ThemeColors = {
  background: string; // midabka bogga
  card: string; // kaararka iyo input-ka
  text: string; // qoraalka ugu weyn
  subtext: string; // qoraalka yar
  border: string; // xariiqda
  primary: string; // badhamada cagaaran
  accent: string; // qoraalka cagaaran (titles, links)
  primarySoft: string; // background yar oo cagaaran (icon circles)
};

const lightColors: ThemeColors = {
  background: '#F7F8FA',
  card: '#FFFFFF',
  text: '#1A1A1A',
  subtext: '#888888',
  border: '#E5E7EB',
  primary: '#0F4C33',
  accent: '#0F4C33',
  primarySoft: '#F0F7F3',
};

const darkColors: ThemeColors = {
  background: '#0B0F0D',
  card: '#151B18',
  text: '#FFFFFF',
  subtext: '#9CA3AF',
  border: '#232A27',
  primary: '#0F4C33',
  accent: '#2ECC71',
  primarySoft: '#1A2A22',
};

type ThemeContextType = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors: isDark ? darkColors : lightColors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used inside a ThemeProvider');
  }
  return context;
}