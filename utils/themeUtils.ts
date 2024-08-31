export const toggleTheme = (darkMode: boolean, handleThemeChange: (newMode: 'light' | 'dark') => void) => {
    const newMode = darkMode ? 'light' : 'dark';
    handleThemeChange(newMode);
};
