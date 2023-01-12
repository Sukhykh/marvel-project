import '../assets/css/MenuFull.scss';
import heroes from '../assets/img/heroesIcon.png';
import comics from '../assets/img/comicsIcon.png';

import React from 'react';
import { useThemeClicker } from '../hooks/useThemeClicker';

function MenuFull() {
	const { theme, setTheme } = useThemeClicker();

	const themeHeroes = () => {
		setTheme('heroes');
	};

	const themeComics = () => {
		setTheme('comics');
	};

	return (
		<ul className='menu'>
			<li className='menu-list' onClick={themeHeroes}>
				<div className='menu-list__img-wrapper'>
					<img
						className='menu-list__img'
						src={heroes}
						alt='icon.png'
					/>
				</div>
				<div className='menu-list__title'>heroes</div>
			</li>
			<li className='menu-list' onClick={themeComics}>
				<div className='menu-list__img-wrapper'>
					<img
						className='menu-list__img'
						src={comics}
						alt='icon.png'
					/>
				</div>
				<div className='menu-list__title'>comics</div>
			</li>
		</ul>
	);
}

export default MenuFull;
