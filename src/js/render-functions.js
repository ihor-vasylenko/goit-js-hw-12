import SimpleLightbox from 'simplelightbox';

const galleryEl = document.getElementById('gallery');
const loaderEl = document.querySelector('.loader');

let lightbox = null;

export function initLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        const alt = tags || 'photo';
        return `
        <li class="card">
          <a href="${largeImageURL}">
            <img class="card-img" src="${webformatURL}" alt="${alt}" loading="lazy" />
          </a>
          <ul class="meta">
            <li><span class="label">Likes</span> ${likes}</li>
            <li><span class="label">Views</span> ${views}</li>
            <li><span class="label">Comments</span> ${comments}</li>
            <li><span class="label">Downloads</span> ${downloads}</li>
          </ul>
        </li>
      `;
      }
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  if (lightbox) lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}
