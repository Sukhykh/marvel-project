import '../assets/css/Comics.scss';

import SliderComics from './SliderComics';

export default function Comics() {
	return (
		<div className='comics'>
			<div className='comics__wrapper'>
				<SliderComics />
				<div className='comics__search'>
					<input
						className='comics__search-area'
						id='search'
						type='text'
						autoComplete='off'
						placeholder={'input here'}
					/>
					<div className='comics__search-btn'>
						let`s grab some comics!
					</div>
				</div>
				<div className='comics__content'></div>
			</div>
		</div>
	);
}
