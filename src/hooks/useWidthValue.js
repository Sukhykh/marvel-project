import { useState, useEffect } from 'react';

const getWidthValue = () => window.innerWidth;

export function useWidthValue() {
	let [widthValue, setWidthValue] = useState(getWidthValue());

	useEffect(() => {
		const resizeListener = () => {
			setWidthValue(getWidthValue());
		};
		window.addEventListener('resize', resizeListener);
		return () => {
			window.removeEventListener('resize', resizeListener);
		};
	}, []);

	return widthValue;
}
