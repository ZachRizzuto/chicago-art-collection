const container = document.getElementById('content');
const open = '[data-open]';
const loader = document.getElementById('loading');

const artData = fetch('https://api.artic.edu/api/v1/artworks?fields=title,artist_title,image_id,date_start,date_end')
	.then(res => {
		displayLoading();
		return res.json();
	})
	.then(data => {
		stopLoading();
		return data;
	})
	.catch((err) => console.log(err));

const createCard = (imgId, title, artist, url) => {
	const urlTail = '/full/843,/0/default.jpg';

	const card = document.createElement('div');
	card.classList.add('art-card');

	const imgContainer = document.createElement('div');
	imgContainer.classList.add('img-container');

	const img = document.createElement('img');
	img.src = url + imgId + urlTail;

	const infoOne = document.createElement('p');
	infoOne.innerHTML = `Title: ${title}`;

	const infoTwo = document.createElement('p');
	infoTwo.innerHTML = `Artist: ${artist}`;

	container.appendChild(card);
	card.appendChild(imgContainer);
	imgContainer.appendChild(img);
	card.appendChild(infoOne);
	card.appendChild(infoTwo);
}

const createModal = (imgUrl) => {
	const modalWrap = document.createElement('div');
	modalWrap.classList.add('modal-wrap');
	modalWrap.dataset.toggle = 'open';
	modalWrap.addEventListener('click', (e) => {
		console.log(e.target);
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

const fromDataToCard = async () => {
	let loadedArt = await artData;

	await loadedArt.data.forEach((piece) => {
		createCard(piece.image_id, piece.title, piece.artist_title, 'https://www.artic.edu/iiif/2/');
	})
	console.log('Cards done.')

	container.addEventListener('click', function(e) {
		let elm = e.target;
		elm.tagName === 'IMG' ? createModal(e.target.src) : null;
	})
}



fromDataToCard();



