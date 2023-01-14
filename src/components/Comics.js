import '../assets/css/Comics.scss';

import Slider from './Slider';
import Search from './Search';

export default function Comics() {
	return (
		<div className='comics'>
			<div className='comics__container'>
				<div className='comics__wrapper'>
					<Slider />
					<Search />
				</div>
			</div>
		</div>
	);
}
