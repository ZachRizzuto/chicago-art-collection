import * as modal from "./modal.js"
import * as fav from "./favFuncs.js"
import * as card from "./cardFuncs.js"

let favs = [];
const container = document.getElementById('content');

const setStorage = () => {
	localStorage.getItem('favorites') === null
	? localStorage.setItem('favorites', JSON.stringify(favs))
	: favs = JSON.parse(localStorage.getItem('favorites'));
}

const fromDataToHTML = async () => {
	setStorage();
	await card.getCardsFavorites('minus');
	console.log('Cards done.');
	fav.showYearsWorked();
}

container.addEventListener('click', (e) => {
	let elm = e.target;
	elm.tagName === 'IMG' ? modal.createModal(e.target.src) : null;
})

container.addEventListener('click', (e) => {
	let card = e.target;
	fav.removeFav(card);
	showYearsWorked();
})

const clearBtn = document.getElementById('clearFav');
clearBtn.addEventListener('click', () => {
	fav.clearFav();
	fav.showYearsWorked();
});

document.getElementById('sort-a').addEventListener('click', function() {
	card.sortCards(card.createCard, 'minus', this.id);
});

document.getElementById('sort-z').addEventListener('click', function() {
	card.sortCards(card.createCard, 'minus', this.id);
});

const favShowBtn = document.getElementById('addFav');
favShowBtn.addEventListener('click', fav.showFavs)

const menuBtn = document.getElementById('mobile-menu-btn');
menuBtn.addEventListener('click', () => {
	let icon = Array.from(menuBtn.children)[0];
	icon.classList.toggle('fa-bars')
	icon.classList.toggle('fa-xmark')
	let menu = document.getElementById('modal-menu');
	modal.openModal(menu);
})

fromDataToHTML();


