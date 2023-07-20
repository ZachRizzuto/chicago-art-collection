const container = document.getElementById('content');

export const createModal = (imgUrl) => {
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

export const closeModal = (modal) => {
	modal.remove();
}