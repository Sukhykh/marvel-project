import '../assets/css/_Logo.scss';
import logo from '../assets/img/sprite.svg';

function Logo(props) {
	let classColor;
	if (props.color === 'light') {
		classColor = 'light';
	} else {
		classColor = 'dark';
	}

	return (
		<div className='logo'>
			<div className='logo__wrapper'>
				<a className='logo__link' href='#'>
					<svg className='logo__svg'>
						<use
							className='logo__img'
							xlinkHref={logo + '#logo'}
						></use>
					</svg>
				</a>
			</div>
		</div>
	);
}

export default Logo;
