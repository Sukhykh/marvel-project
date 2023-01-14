import '../assets/css/Slider.scss';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default function Slider() {
	const themeCheck = localStorage.getItem('themeValue');

	const swiper = new Swiper('.swiper', {
		direction: 'horizontal',
		loop: true,

		/*
  pagination: {
    el: '.swiper-pagination',
  },


  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },


  scrollbar: {
    el: '.swiper-scrollbar',
  },*/
	});

	return (
		<div className='slider'>
			<div className='slider__container'>
				<div className='slider__wrapper'>
					<div class='swiper'>
						<div class='swiper-wrapper'>
							<div class='swiper-slide'>Slide 1</div>
							<div class='swiper-slide'>Slide 2</div>
							<div class='swiper-slide'>Slide 3</div>
						</div>

						<div class='swiper-pagination'></div>

						<div class='swiper-button-prev'></div>
						<div class='swiper-button-next'></div>

						<div class='swiper-scrollbar'></div>
					</div>
				</div>
			</div>
		</div>
	);
}
