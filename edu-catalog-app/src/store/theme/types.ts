export type ThemeState = {
  theme: string;
};

export type ThemeAction = {
  setTheme: (theme: ThemeState["theme"]) => void;
};
