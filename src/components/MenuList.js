import '../assets/css/MenuList.scss';
import heroes from '../assets/img/heroesIcon.png';
import comics from '../assets/img/comicsIcon.png';

import React from 'react';
import { useThemeClicker } from '../hooks/useThemeClicker';

export default function MenuList(props) {
	let imgPath;
	if (props.type === 'heroes') {
		imgPath = heroes;
	} else {
		imgPath = comics;
	}
	console.log(props.type);
	const { theme, setTheme } = useThemeClicker();
	const themeCkicker = () => {
		setTheme(props.type);
	};

	return (
		<li className='menu-list' onClick={themeCkicker}>
			<div className='menu-list__img-wrapper'>
				<img className='menu-list__img' src={imgPath} alt='icon.png' />
			</div>
			<div className='menu-list__title'>{props.type}</div>
		</li>
	);
}
