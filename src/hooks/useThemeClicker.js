import { useEffect, useState } from 'react';

export function useThemeClicker() {
	const getTheme = () => {
		const theme = localStorage.getItem('themeValue');
		if (!theme) {
			localStorage.setItem('themeValue', 'heroes');
			return 'heroes';
		} else {
			return theme;
		}
	};

	const [theme, setTheme] = useState(getTheme);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		const refreshTheme = () => {
			localStorage.setItem('themeValue', theme);
		};
		refreshTheme();
	}, [theme]);

	return { theme, setTheme };
}
