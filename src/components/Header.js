import '../assets/css/Header.scss';

import Logo from './Logo';
import MenuFull from './MenuFull';

export default function Header() {
	let themeName = 'light';
	return (
		<header className='header'>
			<div className='header__container'>
				<div className='header__wrapper'>
					<Logo color={themeName} />
					<MenuFull />
					<a
						className='header__link'
						href='https://www.marvel.com/'
						target='blank'
						rel='noindex, nofollow, noreferrer, noopener'
					>
						Marvel oficial
					</a>
				</div>
			</div>
		</header>
	);
}
