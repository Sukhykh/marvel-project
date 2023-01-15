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
				comicsTitleValue.value = '';

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
		console.log('hello');
		let test = document.createElement('div');
		test.innerText = item;
		return test;
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
		let targetModal = document.querySelector('.book-modal');
		window.addEventListener('click', (event) => {
			if (event.target === targetModal) {
				targetModal.remove();
			}
		});
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
