import '../assets/css/Heroes.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Heroes() {
	const APICEY = 'a5837db97d72016c81a7a776f4240db9';
	const LINK = 'https://gateway.marvel.com:443/v1/public/characters?';
	const placeholderValue = [
		'What hero do you want to find?',
		'You have to input some name!',
		'Hero was not found...',
	];

	const [placeholder, setPlaceholder] = useState(placeholderValue[0]);

	//запит на всіх героїв при завантаженні
	function getAllHeroes(event, offsetValue = 0) {
		axios({
			url: `${LINK}`,
			method: 'GET',
			params: {
				offset: offsetValue,
				apikey: APICEY,
			},
			responseType: 'json',
		})
			.then((res) => {
				let mainBlock = document.getElementById('heroesContent');
				if (!mainBlock) {
					return;
				}
				mainBlock.innerHTML = '';

				let heroesArray = res.data.data.results;
				for (let i = 0; i < heroesArray.length; i++) {
					mainBlock.append(createHeroItem(heroesArray[i]));
				}

				let forPagination = 'getAllHeroes';
				addListenerToDetails(mainBlock);
				createPagination(res.data.data.total);
				addListenerToPaginationItem(offsetValue, forPagination);
			})
			.catch(() => {});
	}

	//запит на пошук героя
	function findHeroes(event, offsetValue = 0) {
		let heroName = document.querySelector('.heroes__search-area');
		if (heroName.value.length === 0) {
			setPlaceholder(placeholderValue[1]);
			return;
		}
		axios({
			url: `${LINK}`,
			method: 'GET',
			params: {
				nameStartsWith: heroName.value,
				offset: offsetValue,
				apikey: APICEY,
			},
			responseType: 'json',
		})
			.then((res) => {
				let mainBlock = document.getElementById('heroesContent');
				if (!mainBlock) {
					return;
				}
				mainBlock.innerHTML = '';

				if (res.data.data.results.length === 0) {
					setPlaceholder(placeholderValue[2]);
					document.getElementById('heroesPagination').innerHTML = '';
					heroName.value = '';
					return;
				}

				let heroesArray = res.data.data.results;
				for (let i = 0; i < heroesArray.length; i++) {
					mainBlock.append(createHeroItem(heroesArray[i]));
				}

				let forPagination = 'findHeroes';
				addListenerToDetails(mainBlock);
				createPagination(res.data.data.total);
				addListenerToPaginationItem(offsetValue, forPagination);
			})
			.catch(() => {});
	}

	//запит на деталі по герою
	function showHeroDetails(event) {
		let heroId = event.target.getAttribute('data-id');
		axios({
			url: `https://gateway.marvel.com:443/v1/public/characters/${heroId}`,
			method: 'GET',
			params: {
				apikey: APICEY,
			},
			responseType: 'json',
		})
			.then((res) => {
				let heroesMain = document.getElementById('heroes');
				heroesMain.append(createHeroDetails(res.data.data.results[0]));
				addListenerToModal();
			})
			.catch(() => {});
	}

	// створення модалки
	function createHeroDetails(item) {
		let urlArrayValue = urlArrayGetter(item.urls);
		let urlValue = urlGetter(item.thumbnail);

		let heroModal = document.createElement('div');
		heroModal.classList.add('hero-modal');

		let hero = document.createElement('div');
		hero.classList.add('hero-modal__wrapper');
		heroModal.append(hero);

		let topSection = document.createElement('div');
		topSection.classList.add('hero-modal__wrapper-top');
		hero.append(topSection);

		let imgWrap = document.createElement('div');
		imgWrap.classList.add('hero-modal__img-wrapper');
		topSection.append(imgWrap);

		let img = document.createElement('img');
		img.classList.add('hero-modal__img');
		img.setAttribute('src', urlValue);
		img.setAttribute('alt', 'heroPoster.jpg');
		imgWrap.append(img);

		let progressBarWrap = document.createElement('div');
		progressBarWrap.classList.add('progress');
		imgWrap.append(progressBarWrap);

		let progressStr = progressBar('strength', '#ED1D24');
		progressBarWrap.append(progressStr);

		let progressAgil = progressBar('agility', '#FF5F1F');
		progressBarWrap.append(progressAgil);

		let progressInt = progressBar('intelligence', '#1F51FF');
		progressBarWrap.append(progressInt);

		let textWrap = document.createElement('div');
		textWrap.classList.add('hero-modal__text-wrapper');
		topSection.append(textWrap);

		let title = document.createElement('div');
		title.classList.add('hero-modal__text-title');
		title.innerText = `${item.name}`;
		textWrap.append(title);

		let descr = document.createElement('div');
		descr.classList.add('hero-modal__text-descr');
		if (!item.description.length || item.description.length === ' ') {
			descr.innerText = `Description not available ...`;
		} else {
			descr.innerText = `${item.description}`;
		}
		textWrap.append(descr);

		let urlDetails = document.createElement('a');
		urlDetails.classList.add('hero-modal__details');
		urlDetails.innerText = 'Find more on Marvel oficial';
		urlDetails.setAttribute('href', `${urlArrayValue[0]}`);
		urlDetails.setAttribute('target', 'blank');
		urlDetails.setAttribute(
			'rel',
			'noindex, nofollow, noreferrer, noopener'
		);
		textWrap.append(urlDetails);

		let bottomSection = document.createElement('div');
		bottomSection.classList.add('hero-modal__wrapper-bottom');
		hero.append(bottomSection);

		let bottomTitle = document.createElement('div');
		bottomTitle.classList.add('hero-modal__bottom-title');
		bottomTitle.innerText = 'comics:';
		bottomSection.append(bottomTitle);

		let allComics = comicsList(item.comics.items);
		bottomSection.append(allComics);

		let comicUrl = document.createElement('a');
		comicUrl.classList.add('hero-modal__bottom-url');
		comicUrl.innerText = 'Click to find more comics';
		comicUrl.setAttribute('href', `${urlArrayValue[1]}`);
		comicUrl.setAttribute('target', 'blank');
		comicUrl.setAttribute('rel', 'noindex, nofollow, noreferrer, noopener');
		bottomSection.append(comicUrl);

		return heroModal;
	}

	// створення одного героя
	function createHeroItem(item) {
		urlGetter(item.thumbnail);
		let urlValue = urlGetter(item.thumbnail);

		let hero = document.createElement('div');
		hero.classList.add('hero__wrapper');
		hero.setAttribute('data-id', item.id);

		let imgWrap = document.createElement('div');
		imgWrap.classList.add('hero__img-wrapper');
		imgWrap.setAttribute('data-id', item.id);

		let img = document.createElement('img');
		img.classList.add('hero__img');
		img.setAttribute('src', urlValue);
		img.setAttribute('alt', 'heroPoster.jpg');

		let textWrap = document.createElement('div');
		textWrap.classList.add('hero__text-wrapper');
		textWrap.setAttribute('data-id', item.id);

		let title = document.createElement('div');
		title.classList.add('hero__text-title');
		title.innerText = `${item.name}`;

		let descr = document.createElement('div');
		descr.classList.add('hero__text-descr');
		if (!item.description.length || item.description.length === ' ') {
			descr.innerText = `Description not available ...`;
		} else {
			descr.innerText = `${item.description}`;
		}

		let heroBtn = document.createElement('div');
		heroBtn.classList.add('hero__btn');
		heroBtn.innerText = 'Ckicl to more information';

		//appends
		hero.append(imgWrap);
		imgWrap.append(img);

		hero.append(textWrap);
		textWrap.append(title);
		textWrap.append(descr);
		textWrap.append(heroBtn);

		return hero;
	}

	// створення пагінації
	function createPagination(amount) {
		let ul = document.getElementById('heroesPagination');
		if (!ul) {
			return;
		}
		ul.innerHTML = '';
		for (let i = 0; i < amount / 20; i++) {
			let el = document.createElement('li');
			el.classList.add('heroes__pagination-point');
			el.innerHTML = i + 1;
			ul.append(el);
		}
	}

	// слухачі на клік для пагінації
	function addListenerToPaginationItem(pageNumber, tester) {
		let StructureCounter = pageNumber / 20;
		let ulItem = document.querySelectorAll('#heroesPagination li');

		if (ulItem.length === 0) {
			return;
		}
		ulItem[StructureCounter].classList.add(
			'heroes__pagination-point--action'
		);

		ulItem.forEach((item) => {
			item.addEventListener('click', (event) => {
				if (
					item.classList.contains('heroes__pagination-point--action')
				) {
					return;
				}
				let returnStructureCounter = event.target.innerText * 20 - 20;
				if (tester === 'findHeroes') {
					findHeroes(event, returnStructureCounter);
				} else {
					getAllHeroes(event, returnStructureCounter);
				}
			});
		});
	}

	// слухачі на клік для деталей
	function addListenerToDetails() {
		let detailsBtns = document.querySelectorAll('.hero__text-wrapper');
		if (detailsBtns.length === 0) {
			return;
		}
		detailsBtns.forEach((btn) =>
			btn.addEventListener('click', showHeroDetails)
		);
	}

	// отримання адреси посилання
	function urlGetter(item) {
		let stringForSepar = item.path;
		let arrayForSepar = stringForSepar.split('//');
		let addressValue = arrayForSepar[1];
		let extensionValue = item.extension;
		let urlValue = 'https://' + addressValue + '.' + extensionValue;
		return urlValue;
	}
	// отримання масиву посилань посилання
	function urlArrayGetter(array) {
		let normalUrlArray = [];
		array.forEach((item) => {
			if (item.type != 'wiki') {
				let stringForSepar = item.url;
				let arrayForSepar = stringForSepar.split('//');
				let addressValue = arrayForSepar[1];
				normalUrlArray.push('https://' + addressValue);
			}
		});
		return normalUrlArray;
	}

	// створення прогресбарів
	function progressBar(name, color) {
		let constValue = Math.floor(Math.random() * 100);
		let progressOuter = document.createElement('div');
		progressOuter.classList.add('progress__outer');

		let progressInner = document.createElement('div');
		progressInner.classList.add('progress__inner');
		progressInner.style.width = `${constValue}%`;
		progressInner.style.backgroundColor = `${color}`;

		let progressText = document.createElement('div');
		progressText.classList.add('progress__text');
		progressText.innerText = `${name}: ${constValue}`;

		progressOuter.append(progressInner);
		progressOuter.append(progressText);

		return progressOuter;
	}

	// створення коміксбару
	function comicsList(arrayValue) {
		let comicsBar = document.createElement('div');
		comicsBar.classList.add('hero-modal__comics-bar');
		arrayValue.forEach((element, index) => {
			let singlComics = document.createElement('div');
			singlComics.classList.add('hero-modal__comics-item');
			singlComics.innerText = `${index + 1}. ${element.name}`;
			comicsBar.append(singlComics);
		});
		return comicsBar;
	}

	// слухач на модалку для закриття
	function addListenerToModal() {
		let targetModal = document.querySelector('.hero-modal');
		window.addEventListener('click', (event) => {
			if (event.target === targetModal) {
				targetModal.remove();
			}
		});
	}

	useEffect(() => {
		getAllHeroes(undefined, 0);
	}, []);

	return (
		<div className='heroes' id='heroes'>
			<div className='heroes__wrapper'>
				<div className='heroes__search'>
					<input
						className='heroes__search-area'
						id='search'
						type='text'
						autoComplete='off'
						placeholder={placeholder}
					/>
					<div className='heroes__search-btn' onClick={findHeroes}>
						let`s grab some heroes!
					</div>
				</div>
				<div className='heroes__content' id='heroesContent'></div>
				<ul className='heroes__pagination' id='heroesPagination'></ul>
			</div>
		</div>
	);
}
