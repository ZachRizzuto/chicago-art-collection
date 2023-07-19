const artData = fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=12')
	.then(res => res.json())
	.then(data => data)
	.catch((err) => console.log(err));

let favs;
const container = document.getElementById('content');
const loader = document.getElementById('loading');
localStorage.getItem('favorites') === null
? favs = []
: favs = JSON.parse(localStorage.getItem('favorites'));

const createCard = (imgId, title, artist, url, dateStart, dateEnd, artId) => {
	const urlTail = '/full/843,/0/default.jpg';

	const card = document.createElement('div');
	card.classList.add('art-card');
	card.dataset.favorite = 'no';

	const favBtn = document.createElement('button');
	favBtn.classList.add('favBtn');
	favBtn.dataset.addfav = 'true';

	const btnIcon = document.createElement('i');
	btnIcon.classList.add('fa-solid');
	btnIcon.classList.add('fa-minus');

	const imgContainer = document.createElement('div');
	imgContainer.classList.add('img-container');

	const img = document.createElement('img');
	imgId === null 
	? img.src = 'https://cdn.pixabay.com/photo/2016/06/03/08/18/oops-1432954_960_720.png'
	: img.src = url + imgId + urlTail;

	const infoOne = document.createElement('p');
	infoOne.innerText = `Title: ${title}`;

	const yearsWorked = document.createElement('p');
	yearsWorked.classList.add('yrs-wrkd');
	let yearPhrase = `Years Worked On: `;
	dateStart - dateEnd === 0 
	? yearsWorked.innerText = yearPhrase + '1' 
	: yearsWorked.innerText = yearPhrase + `${dateEnd - dateStart}`;

	const infoTwo = document.createElement('p');
	artist === null 
	? infoTwo.innerText = `Creator: Unknown`
	: infoTwo.innerText = `Creator: ${artist}`;

	const infoThree = document.createElement('p');
	infoThree.innerText = `Artwork Id: ${artId}`;
	infoThree.classList.add('idInfo');

	container.append(card);
	card.append(favBtn, imgContainer, infoOne, yearsWorked, infoTwo, infoThree);
	favBtn.append(btnIcon);
	imgContainer.append(img);
}

const getCards = async () => {
	let loadedArt = await artData;
	loadedArt.data.forEach((piece) => {
		if (JSON.parse(localStorage.getItem('favorites')).includes(piece.id)) {
			createCard(
				piece.image_id, 
				piece.title, 
				piece.artist_title, 
				'https://www.artic.edu/iiif/2/', 
				piece.date_start, 
				piece.date_end, 
				piece.id
			);
		}
	})
}

const showFavs = () => {
	let btn = document.getElementById('addFav')
	let favBtns = document.querySelectorAll('.favBtn');
	btn.addEventListener('click', () => {
		if (Array.from(favBtns[0].classList).includes('scale-one')) {
			btn.innerHTML = 'Remove Favorites';
			favBtns.forEach((b) => b.classList.remove('scale-one'));
		} else {
			btn.innerHTML = 'Done';
			favBtns.forEach((b) => b.classList.add('scale-one'));
		}
	})
}

const removeFav = async () => {
	container.addEventListener('click', function (e) {
		let elm = e.target;
		if (elm.dataset.addfav === 'true') {
			let elmparent = e.target.parentElement;
			let id = elmparent.querySelector('.idInfo').textContent.match(/\d/g).join("");
			let faved = JSON.parse(localStorage.getItem('favorites'));
			for(let i of faved) {
				if (i == id) {
					faved.splice(faved.indexOf(i), 1)
				}
			}
			elmparent.remove();
			showYearsWorked();
			let store = JSON.stringify(faved);
			localStorage.setItem('favorites', store);
		}
	})
}

const clearFav = () => {
	localStorage.setItem('favorites', '[]');
	let cards = document.querySelectorAll('.art-card');
	cards.forEach((card) => card.remove());
}

const createModal = (imgUrl) => {
	const modalWrap = document.createElement('div');
	modalWrap.classList.add('modal-wrap');
	modalWrap.dataset.toggle = 'open';
	modalWrap.addEventListener('click', (e) => {
		closeModal(e.target);
	});

	const modalImgWrap = document.createElement('div');
	modalImgWrap.classList.add('modal-img-wrap');

	const modalImg = document.createElement('img');
	modalImg.classList.add('modal-img');
	modalImg.src = imgUrl;

	container.appendChild(modalWrap);
	modalWrap.appendChild(modalImgWrap);
	modalImgWrap.appendChild(modalImg);
}

const closeModal = (modal) => {
	modal.remove();
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

const displayLoading = () => {
	loader.classList.toggle('visible');
}

const fromDataToHTML = async () => {
	await getCards();
	console.log('Cards done.');
	showYearsWorked();
	showFavs();
	removeFav();
}

container.addEventListener('click', (e) => {
	let elm = e.target;
	elm.tagName === 'IMG' ? createModal(e.target.src) : null;
})

const clearBtn = document.getElementById('clearFav');

clearBtn.addEventListener('click', clearFav);

fromDataToHTML();


