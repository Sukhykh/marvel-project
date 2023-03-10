import '../assets/css/_Footer.scss';

import Logo from './Logo';

function Footer() {
	return (
		<footer className='footer'>
			<div className='footer__container'>
				<div className='footer__wrapper'>
					<Logo />
				</div>
			</div>
			<div className='footer__divider'></div>
			<div className='footer__copy'>© 2023 copiright information</div>
		</footer>
	);
}

export default Footer;
