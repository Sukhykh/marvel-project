import '../assets/css/Comics.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Comics() {
	const APICEY = 'a5837db97d72016c81a7a776f4240db9';
	const LINK = 'https://gateway.marvel.com:443/v1/public/comics?';
	const placeholderValue = [
		'What hero do you want to find?',
		'You have to input some title!',
		'Comics were not found...',
	];

	const [placeholder, setPlaceholder] = useState(placeholderValue[0]);

	//запит на всіх героїв при завантаженні
	function getAllComics(event, offsetValue = 0) {
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
				let mainBlock = document.getElementById('comicsContent');
				if (!mainBlock) {
					return;
				}
				mainBlock.innerHTML = '';

				let comicsArray = res.data.data.results;
				for (let i = 0; i < comicsArray.length; i++) {
					mainBlock.append(createComicsItem(comicsArray[i]));
				}

				let forPagination = 'getAllComics';
				addListenerToDetails(mainBlock);
				createPagination(res.data.data.total);
				addListenerToPaginationItem(offsetValue, forPagination);
			})
			.catch(() => {});
	}

	//запит на пошук комікса
	function findComics(event, offsetValue = 0) {
		let comicsTitleValue = document.querySelector('.comics__search-area');
		if (comicsTitleValue.value.length === 0) {
			setPlaceholder(placeholderValue[1]);
			return;
		}
		axios({
			url: `${LINK}`,
			method: 'GET',
			params: {
				titleStartsWith: comicsTitleValue.value,
				offset: offsetValue,
				apikey: APICEY,
			},
			responseType: 'json',
		})
			.then((res) => {
				let mainBlock = document.getElementById('comicsContent');
				if (!mainBlock) {
					return;
				}
				mainBlock.innerHTML = '';

				if (res.data.data.results.length === 0) {
					setPlaceholder(placeholderValue[2]);
					document.getElementById('comicsPagination').innerHTML = '';
					comicsTitleValue.value = '';
					return;
				}

				let comicsArray = res.data.data.results;
				for (let i = 0; i < comicsArray.length; i++) {
					mainBlock.append(createComicsItem(comicsArray[i]));
				}

				let forPagination = 'findComics';
				addListenerToDetails(mainBlock);
				createPagination(res.data.data.total);
				addListenerToPaginationItem(offsetValue, forPagination);
			})
			.catch(() => {});
	}

	//запит на деталі по коміксу
	function showComicsDetails(event) {
		let comicsId = event.target.getAttribute('data-id');
		axios({
			url: `https://gateway.marvel.com:443/v1/public/comics/${comicsId}`,
			method: 'GET',
			params: {
				apikey: APICEY,
			},
			responseType: 'json',
		})
			.then((res) => {
				let comicsMain = document.getElementById('comics');
				comicsMain.append(
					createComicsDetails(res.data.data.results[0])
				);
				addListenerToModal();
			})
			.catch(() => {});
	}

	// створення модалки
	function createComicsDetails(item) {
		console.log(item);
		let urlValue = urlGetter(item.thumbnail);

		let stringForSepar = item.urls[0].url;
		let arrayForSepar = stringForSepar.split('//');
		let addressValue = arrayForSepar[1];
		let urlDetailsValue = 'https://' + addressValue;

		let comicsModal = document.createElement('div');
		comicsModal.classList.add('comics-modal');

		let comics = document.createElement('div');
		comics.classList.add('comics-modal__wrapper');
		comicsModal.append(comics);

		let topSection = document.createElement('div');
		topSection.classList.add('comics-modal__wrapper-top');
		comics.append(topSection);

		let imgWrap = document.createElement('div');
		imgWrap.classList.add('comics-modal__img-wrapper');
		topSection.append(imgWrap);

		let img = document.createElement('img');
		img.classList.add('comics-modal__img');
		img.setAttribute('src', urlValue);
		img.setAttribute('alt', 'comicsPoster.jpg');
		imgWrap.append(img);

		let characterBar = document.createElement('div');
		characterBar.classList.add('comics-modal__characters-wrapper');
		imgWrap.append(characterBar);

		item.characters.items.forEach((item) => {
			let character = document.createElement('div');
			character.classList.add('comics-modal__characters-item');
			character.innerText = item.name;
			let stringForSId = item.resourceURI;
			let arrayForSId = stringForSId.split('/');
			let idValue = arrayForSId[arrayForSId.length - 1];
			character.setAttribute('data-id', `${idValue}`);
			characterBar.append(character);
			addEventlistenertoCharacterName(character);
		});

		let textWrap = document.createElement('div');
		textWrap.classList.add('comics-modal__text-wrapper');
		topSection.append(textWrap);

		let title = document.createElement('div');
		title.classList.add('comics-modal__text-title');
		title.innerText = `${item.title}`;
		textWrap.append(title);

		let descr = document.createElement('div');
		descr.classList.add('comics-modal__text-descr');
		if (item.description === '' || item.description === null) {
			descr.innerText = `Description not available ...`;
		} else {
			descr.innerText = `${item.description}`;
		}
		textWrap.append(descr);

		let creatorsBar = document.createElement('div');
		creatorsBar.classList.add('comics-modal__creators-wrapper');
		textWrap.append(creatorsBar);

		item.creators.items.forEach((item) => {
			let creators = document.createElement('div');
			creators.classList.add('comics-modal__creators-item');
			creators.innerText = `${item.role}: ${item.name}`;
			creatorsBar.append(creators);
		});

		let urlDetails = document.createElement('a');
		urlDetails.classList.add('comics-modal__details');
		urlDetails.innerText = 'Find more on Marvel oficial';
		urlDetails.setAttribute('href', `${urlDetailsValue}`);
		urlDetails.setAttribute('target', 'blank');
		urlDetails.setAttribute(
			'rel',
			'noindex, nofollow, noreferrer, noopener'
		);
		textWrap.append(urlDetails);
		return comicsModal;
	}
	// створення одного комікса
	function createComicsItem(item) {
		urlGetter(item.thumbnail);
		let urlValue = urlGetter(item.thumbnail);

		let hero = document.createElement('div');
		hero.classList.add('book__wrapper');
		hero.setAttribute('data-id', item.id);

		let imgWrap = document.createElement('div');
		imgWrap.classList.add('book__img-wrapper');
		imgWrap.setAttribute('data-id', item.id);

		let img = document.createElement('img');
		img.classList.add('book__img');
		img.setAttribute('src', urlValue);
		img.setAttribute('alt', 'bookPoster.jpg');

		let textWrap = document.createElement('div');
		textWrap.classList.add('book__text-wrapper');
		textWrap.setAttribute('data-id', item.id);

		let title = document.createElement('div');
		title.classList.add('book__text-title');
		title.innerText = `${item.title}`;

		let descr = document.createElement('div');
		descr.classList.add('book__text-descr');
		/*
		console.log(item.description);
		if (item.description === ' ' || item.description === null) {
			descr.innerText = `Description not available ...`;
			console.log(item.description);
		} else {
			descr.innerText = `${item.description}`;
			console.log(hero);
		}
*/
		let heroBtn = document.createElement('div');
		heroBtn.classList.add('book__btn');
		heroBtn.innerText = 'Ckicl to more information';

		//appends
		hero.append(imgWrap);
		imgWrap.append(img);

		hero.append(textWrap);
		textWrap.append(title);
		//textWrap.append(descr);
		textWrap.append(heroBtn);

		return hero;
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

	// створення пагінації
	function createPagination(amount) {
		let ul = document.getElementById('comicsPagination');
		if (!ul) {
			return;
		}
		ul.innerHTML = '';
		for (let i = 0; i < amount / 20; i++) {
			let el = document.createElement('li');
			el.classList.add('comics__pagination-point');
			el.innerHTML = i + 1;
			ul.append(el);
		}
	}

	// слухачі на клік для пагінації
	function addListenerToPaginationItem(pageNumber, tester) {
		let StructureCounter = pageNumber / 20;
		let ulItem = document.querySelectorAll('#comicsPagination li');

		if (ulItem.length === 0) {
			return;
		}
		ulItem[StructureCounter].classList.add(
			'comics__pagination-point--action'
		);

		ulItem.forEach((item) => {
			item.addEventListener('click', (event) => {
				if (
					item.classList.contains('comics__pagination-point--action')
				) {
					return;
				}
				let returnStructureCounter = event.target.innerText * 20 - 20;
				if (tester === 'findComics') {
					findComics(event, returnStructureCounter);
				} else {
					getAllComics(event, returnStructureCounter);
				}
			});
		});
	}

	// слухачі на клік для деталей
	function addListenerToDetails() {
		let detailsBtns = document.querySelectorAll('.book__text-wrapper');
		if (detailsBtns.length === 0) {
			return;
		}
		detailsBtns.forEach((btn) =>
			btn.addEventListener('click', showComicsDetails)
		);
	}

	// слухач на модалку для закриття
	function addListenerToModal() {
		let targetModal = document.querySelector('.comics-modal');
		window.addEventListener('click', (event) => {
			if (event.target === targetModal) {
				targetModal.remove();
			}
		});
	}

	//слухачі на клік для персонажей
	function addEventlistenertoCharacterName(item) {
		item.addEventListener('click', (event) => {
			let targetId = event.target.getAttribute('data-id');
			showHeroDetails(event, targetId);
		});
	}

	//запит на деталі по герою
	function showHeroDetails(event, idValue) {
		axios({
			url: `https://gateway.marvel.com:443/v1/public/characters/${idValue}`,
			method: 'GET',
			params: {
				apikey: APICEY,
			},
			responseType: 'json',
		})
			.then((res) => {
				let heroesMain = document.getElementById('comics');
				let comicsModal = document.querySelector('.comics-modal');
				comicsModal.style.opasity = '0';
				heroesMain.append(createHeroDetails(res.data.data.results[0]));
				addListenerToModalHero();
			})
			.catch(() => {});
	}

	// слухач на модалку для закриття модалки героїв
	function addListenerToModalHero() {
		let targetModal = document.querySelector('.hero-modal');
		window.addEventListener('click', (event) => {
			if (event.target === targetModal) {
				let comicsModal = document.querySelector('.comics-modal');
				comicsModal.style.opasity = '1';
				targetModal.remove();
			}
		});
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

	useEffect(() => {
		getAllComics(undefined, 0);
	}, []);

	return (
		<div className='comics' id='comics'>
			<div className='comics__wrapper'>
				<div className='comics__search'>
					<input
						className='comics__search-area'
						id='search'
						type='text'
						autoComplete='off'
						placeholder={placeholder}
					/>
					<div className='comics__search-btn' onClick={findComics}>
						let`s grab some comics!
					</div>
				</div>
				<div className='comics__content' id='comicsContent'></div>
				<ul className='comics__pagination' id='comicsPagination'></ul>
			</div>
		</div>
	);
}
