const artData = fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=12')
	.then(res => res.json())
	.then(data => data)
	.catch((err) => console.log(err));

export function showFavs() {
	let favBtns = document.querySelectorAll('.favBtn');
	if (Array.from(favBtns[0].classList).includes('scale-one')) {
		this.textContent = 'Edit Favorites';
		favBtns.forEach((b) => b.classList.remove('scale-one'));
	} else {
		this.textContent = 'Done';
		favBtns.forEach((b) => b.classList.add('scale-one'));
	}
}

export const removeFav = async (card) => {
		if (card.dataset.addfav === 'true') {
			let elmparent = card.parentElement;
			let id = elmparent.querySelector('.idInfo').textContent.match(/\d/g).join("");
			let faved = JSON.parse(localStorage.getItem('favorites'));
			for(let i of faved) {
				if (i == id) {
					faved.splice(faved.indexOf(i), 1)
				}
			}
			elmparent.remove();
			let store = JSON.stringify(faved);
			localStorage.setItem('favorites', store);
		}
	}

export const clearFav = () => {
	localStorage.setItem('favorites', '[]');
	let cards = document.querySelectorAll('.art-card');
	cards.forEach((card) => card.remove());
}

export const addFav = async (card, arr) => {
	let loadedArt = await artData;
	if (card.dataset.addfav === 'true') {
		card.dataset.addfav = 'false';
		let elmparent = card.parentElement;
		let id = elmparent.querySelector('.idInfo').textContent.match(/\d/g).join("");
		let piece = loadedArt.data;
		for (let i of piece) {
			if (i.id == id) {
				arr.push(i.id);
			}
		}
		elmparent.remove();
	}
	let store = JSON.stringify(arr);
	localStorage.setItem('favorites', store);
}