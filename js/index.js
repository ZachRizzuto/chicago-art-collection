const favs = [];

const container = document.getElementById('content');
const open = '[data-open]';
const loader = document.getElementById('loading');

const artData = fetch('https://api.artic.edu/api/v1/artworks?fields=title,artist_title,image_id,date_start,date_end,id')
	.then(res => res.json())
	.then(data => data)
	.catch((err) => console.log(err));

const createCard = (imgId, title, artist, url, dateStart, dateEnd, artId) => {
		const urlTail = '/full/843,/0/default.jpg';
	
		const card = document.createElement('div');
		card.classList.add('art-card');
		card.dataset.favorite = 'no';
	
		const favBtn = document.createElement('button');
		favBtn.classList.add('favBtn');
		favBtn.dataset.addfav = 'true';
	
		const btnIcon = document.createElement('i');
		btnIcon.classList.add('fa-regular');
		btnIcon.classList.add('fa-plus');
	
		const imgContainer = document.createElement('div');
		imgContainer.classList.add('img-container');
	
		const img = document.createElement('img');
		imgId === null 
		? img.src = 'https://cdn.pixabay.com/photo/2016/06/03/08/18/oops-1432954_960_720.png'
		: img.src = url + imgId + urlTail;
	
		const infoOne = document.createElement('p');
		infoOne.innerHTML = `Title: ${title}`;
	
		const yearsWorked = document.createElement('p');
		let yearPhrase = `Years Worked On: `;
		dateStart - dateEnd === 0 
		? yearsWorked.innerHTML = yearPhrase + '1' 
		: yearsWorked.innerHTML = yearPhrase + `${dateEnd - dateStart}`;
	
		const infoTwo = document.createElement('p');
		artist === null 
		? infoTwo.innerHTML = `Creator: Unknown`
		: infoTwo.innerHTML = `Creator: ${artist}`;

		const infoThree = document.createElement('p');
		infoThree.innerHTML = `Artwork Id: ${artId}`;
		infoThree.classList.add('idInfo');
	
		container.appendChild(card);
		card.appendChild(favBtn);
		favBtn.appendChild(btnIcon);
		card.appendChild(imgContainer);
		imgContainer.appendChild(img);
		card.appendChild(infoOne);
		card.appendChild(yearsWorked);
		card.appendChild(infoTwo);
		card.appendChild(infoThree);
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

const displayLoading = () => {
	loader.classList.add('visible');
}

const stopLoading = () => {
	loader.classList.remove('visible');
}

const showYearsWorked = async () => {
	let loadedArt = await artData;
	let yearCounter = document.querySelector('.years-worked');
	let totalYears = 0;
	await loadedArt.data.forEach((piece) => {
		let start = piece.date_start;
		let end = piece.date_end;
		if (end - start === 0) {
			totalYears += 1;
		} else {
			totalYears += (piece.date_end - piece.date_start);
		}
	})
	yearCounter.innerHTML = `Total Years Worked: ${totalYears} years`;
}

const fromDataToHTML = async () => {
	let loadedArt = await artData;

	displayLoading();

	await loadedArt.data.forEach((piece) => {
		createCard(piece.image_id, piece.title, piece.artist_title, 'https://www.artic.edu/iiif/2/', piece.date_start, piece.date_end, piece.id);
	})

	stopLoading();
	console.log('Cards done.');

	showYearsWorked();
	showFavs();
	addFav();
}

container.addEventListener('click', (e) => {
	let elm = e.target;
	elm.tagName === 'IMG' ? createModal(e.target.src) : null;
})

const addFav = async () => {
	let loadedArt = await artData;
	container.addEventListener('click', function (e) {
		let elm = e.target;
		if (elm.dataset.addfav === 'true') {
			let elmparent = e.target.parentElement;
			let id = elmparent.querySelector('.idInfo').textContent.match(/\d/g).join("");
			let piece = loadedArt.data;
			for (i of piece) {
				if (i.id == id && !favs.includes(i)) {
					favs.push(i);
					console.log(favs);
				}
			}
		}
	})
}


const showFavs = () => {
	let btn = document.getElementById('addFav')
	let favBtns = document.querySelectorAll('.favBtn');
	btn.addEventListener('click', () => {
		if (Array.from(favBtns[0].classList).includes('scale-one')) {
			btn.innerHTML = 'Add Favorites';
			favBtns.forEach((b) => b.classList.remove('scale-one'));
		} else {
			btn.innerHTML = 'Done';
			favBtns.forEach((b) => b.classList.add('scale-one'));
		}
	})
}

fromDataToHTML();



