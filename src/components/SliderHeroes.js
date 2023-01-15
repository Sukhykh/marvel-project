import '../assets/css/SliderHeroes.scss';

import React from 'react';
import { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import axios from 'axios';

export default function SliderHeroes() {
	const APICEY = 'a5837db97d72016c81a7a776f4240db9';
	const LINK = 'https://gateway.marvel.com:443/v1/public/characters/';

	const forHeroesSlider = [
		'1009610',
		'1009368',
		'1017109',
		'1009718',
		'1009220',
	];

	function axiosHeroRequest(array) {
		array.forEach((item) => {
			axios({
				url: `${LINK}` + `${item}`,
				method: 'GET',
				params: {
					apikey: APICEY,
				},
				responseType: 'json',
			})
				.then((res) => {
					let slider = document.querySelector(
						'.slider__hero-wrapper'
					);
					let findArray = res.data.data.results;
					slider.append(createSlide(findArray[0]));
				})
				.catch(() => {});
		});
	}

	function createSlide(item) {
		let slide = document.createElement('div');
		slide.classList.add('swiper-slide');
		slide.setAttribute('data-id', item.id);

		let slideWrap = document.createElement('div');
		slideWrap.classList.add('slide__wrapper');

		let imgWrap = document.createElement('div');
		imgWrap.classList.add('slide__img-wrapper');

		let img = document.createElement('img');
		img.classList.add('slide__img');
		img.setAttribute('src', item.thumbnail.path);

		let textWrap = document.createElement('div');
		textWrap.classList.add('slide__text-wrapper');

		let popular = document.createElement('div');
		popular.classList.add('slide__text-popular');
		popular.innerText = 'most popular character';

		let title = document.createElement('div');
		title.classList.add('slide__text-title');
		title.innerText = `${item.name}`;

		let heroBtn = document.createElement('div');
		heroBtn.classList.add('slide__text-btn');
		heroBtn.innerText = 'details';

		//appends
		slide.append(slideWrap);
		slideWrap.append(imgWrap);
		slideWrap.append(textWrap);
		slideWrap.append(heroBtn);
		textWrap.append(popular);
		textWrap.append(title);

		return slide;
	}
	/*
	useEffect(() => {
		axiosHeroRequest(forHeroesSlider);
	}, []);
*/
	const swiper = new Swiper('.slider__hero', {
		direction: 'horizontal',
		loop: true,
		initialSlide: 1,
		centeredSlides: true,
		simulateTouch: true,
		grabCursor: true,

		speed: 3000,

		//observer: true,
		//observerParents: true,
		//observerSlideChildren: true,

		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},

		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},

		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
	});

	return (
		<div className='slider'>
			<div className='slider__container'>
				<div className='slider__wrapper'>
					<div className='slider__hero swiper'>
						<div className='slider__hero-wrapper swiper-wrapper'></div>
					</div>
				</div>
			</div>
		</div>
	);
}
