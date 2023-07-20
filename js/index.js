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
	await card.getCardsCollection('plus');
	console.log('Cards done.');
	fav.showYearsWorked();
}

container.addEventListener('click', (e) => {
	let elm = e.target;
	elm.tagName === 'IMG' ? modal.createModal(e.target.src) : null;
})

container.addEventListener('click', (e) => {
	let card = e.target;
	fav.addFav(card, favs);
})

document.getElementById('sort').addEventListener('click', () => card.sortCards(card.createCard, 'plus'));

const favShowBtn = document.getElementById('addFav');
favShowBtn.addEventListener('click', fav.showFavs);

const menuBtn = document.getElementById('mobile-menu-btn');
menuBtn.addEventListener('click', () => {
	let icon = Array.from(menuBtn.children)[0];
	icon.classList.toggle('fa-bars')
	icon.classList.toggle('fa-xmark')
	let menu = document.getElementById('modal-menu');
	modal.openModal(menu);
})


fromDataToHTML();



