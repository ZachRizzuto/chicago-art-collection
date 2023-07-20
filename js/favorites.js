import * as modal from "./modal.js"
import * as fav from "./favFuncs.js"
import * as card from "./cardFuncs.js"

let favs;
const container = document.getElementById('content');

const setStorage = () => {
	localStorage.getItem('favorites') === null
	? favs = []
	: favs = JSON.parse(localStorage.getItem('favorites'));
}

const showYearsWorked = () => {
	let yearCounter = document.querySelector('.years-worked');
	let totalYears = 0;
	let cards = Array.from(document.querySelectorAll('.yrs-wrkd'));
	cards.forEach((c) => {
		let yearNum = c.textContent.match(/\d/g).join("");
		totalYears += Number(yearNum);
	})
	yearCounter.innerText = `Total Years Worked: ${totalYears} years`;
}

const fromDataToHTML = async () => {
	setStorage();
	await card.getCardsFavorites('minus');
	console.log('Cards done.');
	showYearsWorked();
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
clearBtn.addEventListener('click', fav.clearFav);
document.getElementById('sort').addEventListener('click', () => card.sortCards(card.createCard, 'minus'));

const favShowBtn = document.getElementById('addFav');
favShowBtn.addEventListener('click', fav.showFavs)

fromDataToHTML();


