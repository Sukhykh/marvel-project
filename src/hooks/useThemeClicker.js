import { useEffect, useState } from 'react';

export function useThemeClicker() {
	const [theme, setTheme] = useState('comics');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	return { theme, setTheme };
}
