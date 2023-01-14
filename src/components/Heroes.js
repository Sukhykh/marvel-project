import '../assets/css/Heroes.scss';

import Slider from './Slider';
import Search from './Search';

export default function Heroes() {
	return (
		<div className='heroes'>
			<div className='heroes__container'>
				<div className='heroes__wrapper'>
					<Slider />
					<Search />
				</div>
			</div>
		</div>
	);
}
