const artData = fetch('https://api.artic.edu/api/v1/artworks?page=1&limit=12')
	.then(res => res.json())
	.then(data => data)
	.catch((err) => console.log(err));

const container = document.getElementById('content');

export const createCard = (imgId, title, artist, url, dateStart, dateEnd, artId, icon) => {
	const urlTail = '/full/843,/0/default.jpg';

	const card = document.createElement('div');
	card.classList.add('art-card');
	card.dataset.favorite = 'no';

	const favBtn = document.createElement('button');
	favBtn.classList.add('favBtn');
	favBtn.dataset.addfav = 'true';

	const btnIcon = document.createElement('i');
	btnIcon.classList.add('fa-solid');
	btnIcon.classList.add(`fa-${icon}`);

	const imgContainer = document.createElement('div');
	imgContainer.classList.add('img-container');

	const img = document.createElement('img');
	imgId === null 
	? img.src = 'https://cdn.pixabay.com/photo/2016/06/03/08/18/oops-1432954_960_720.png'
	: img.src = url + imgId + urlTail;

	const infoOne = document.createElement('p');
	infoOne.classList.add('titleInfo');
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

export const getCardsCollection = async (icon) => {
	let loadedArt = await artData;
	loadedArt.data.forEach((piece) => {
		if (!JSON.parse(localStorage.getItem('favorites')).includes(piece.id)) {
			createCard(
				piece.image_id, 
				piece.title, 
				piece.artist_title, 
				'https://www.artic.edu/iiif/2/', 
				piece.date_start, 
				piece.date_end, 
				piece.id,
				icon
			);
		}
	})
}

export const getCardsFavorites = async (icon) => {
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
				piece.id,
				icon
			);
		}
	})
}

export const sortCards = async function (func, icon, id) {
	let loadedArt = await artData;
	let cards = document.querySelectorAll('.art-card');
	let titles = Array.from(document.querySelectorAll('.titleInfo'));
	let ids = Array.from(document.querySelectorAll('.idInfo'));
	let titlesArray = [];

	for(let i = 0; i < titles.length; i++) {
		let id = ids[i].textContent.slice(12);
		let title = titles[i].textContent.slice(7);
		titlesArray.push([title, id]);
	}

	titlesArray.sort();

	if(id === 'sort-z') {
		titlesArray.reverse();
	}

	cards.forEach((c) => c.remove());
	
	titlesArray.forEach((t) => {
		loadedArt.data.forEach((art) => {
			if (t[1] == art.id) {
				func(
					art.image_id,
					art.title,
					art.artist_title,
					'https://www.artic.edu/iiif/2/', 
					art.date_start,
					art.date_end,
					art.id,
					icon
				);
			}
		})
	})
}