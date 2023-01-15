import '../assets/css/Footer.scss';

import Logo from './Logo';

function Footer() {
	return (
		<footer className='footer'>
			<footer className='footer__container'>
				<div className='footer__wrapper'>
					<Logo />
				</div>
			</footer>
			<div className='footer__divider'></div>
			<div className='footer__copy'>© 2023 copiright information</div>
		</footer>
	);
}

export default Footer;
