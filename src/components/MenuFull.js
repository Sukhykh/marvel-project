import '../assets/css/MenuFull.scss';
import heroes from '../assets/img/heroesIcon.png';
import comics from '../assets/img/comicsIcon.png';

import React from 'react';
import { useState } from 'react';
import { useThemeClicker } from '../hooks/useThemeClicker';
import { useWidthValue } from '../hooks/useWidthValue';
import { Link } from 'react-router-dom';

function MenuFull() {
	//зміна теми
	const { theme, setTheme } = useThemeClicker();
	const themeHeroes = () => {
		setTheme('heroes');
		if (!isActiveHeroes) {
			handleClickHeroes();
			handleClickComics();
		}
	};
	const themeComics = () => {
		setTheme('comics');
		if (!isActiveComics) {
			handleClickHeroes();
			handleClickComics();
		}
	};

	//додавання класів
	const themeCheckHeroes = () => {
		const themeCheck = localStorage.getItem('themeValue');
		if (themeCheck === 'heroes') {
			return true;
		} else {
			return false;
		}
	};
	const themeCheckHComics = () => {
		const themeCheck = localStorage.getItem('themeValue');
		if (themeCheck === 'comics') {
			return true;
		} else {
			return false;
		}
	};

	const [isActiveHeroes, setIsActiveHeroes] = useState(themeCheckHeroes);
	const [isActiveComics, setIsActiveComics] = useState(themeCheckHComics);
	const handleClickHeroes = () => {
		setIsActiveHeroes((current) => !current);
	};
	const handleClickComics = () => {
		setIsActiveComics((current) => !current);
	};

	//прибирання тексту
	let widthValue = useWidthValue();

	return (
		<ul className='menu'>
			<li className='menu-list' onClick={themeHeroes}>
				<Link
					className={
						isActiveHeroes
							? 'menu-list__link menu-list__link--true'
							: 'menu-list__link menu-list__link--false'
					}
					to='/'
				>
					<div className='menu-list__img-wrapper'>
						<img
							className='menu-list__img'
							src={heroes}
							alt='icon.png'
						/>
					</div>
					<div
						className={
							widthValue < 600
								? 'menu-list__title-wrapper--none'
								: widthValue < 900 && !isActiveHeroes
								? 'menu-list__title-wrapper--none'
								: 'menu-list__title-wrapper'
						}
					>
						<div
							className={
								isActiveHeroes
									? 'menu-list__title menu-list__title--true'
									: 'menu-list__title menu-list__title--false'
							}
						>
							heroes
						</div>
					</div>
				</Link>
			</li>
			<li className='menu-list' onClick={themeComics}>
				<Link
					className={
						isActiveComics
							? 'menu-list__link menu-list__link--true'
							: 'menu-list__link menu-list__link--false'
					}
					to='/comics'
				>
					<div className='menu-list__img-wrapper'>
						<img
							className='menu-list__img'
							src={comics}
							alt='icon.png'
						/>
					</div>
					<div
						className={
							widthValue < 600
								? 'menu-list__title-wrapper--none'
								: widthValue < 900 && !isActiveComics
								? 'menu-list__title-wrapper--none'
								: 'menu-list__title-wrapper'
						}
					>
						<div
							className={
								isActiveComics
									? 'menu-list__title menu-list__title--true'
									: 'menu-list__title menu-list__title--false'
							}
						>
							comics
						</div>
					</div>
				</Link>
			</li>
		</ul>
	);
}

export default MenuFull;
