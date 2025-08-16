import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.getElementById('gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.getElementById('load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function card({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="card">
      <a href="${largeImageURL}">
        <img class="card-img" src="${webformatURL}" alt="${tags}" />
      </a>
      <ul class="meta">
        <li><span class="label">Likes</span> ${likes}</li>
        <li><span class="label">Views</span> ${views}</li>
        <li><span class="label">Comments</span> ${comments}</li>
        <li><span class="label">Downloads</span> ${downloads}</li>
      </ul>
    </li>`;
}

export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;
  const markup = images.map(card).join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
  lightbox.refresh();
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
