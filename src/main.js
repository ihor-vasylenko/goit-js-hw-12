import { getImagesByQuery } from './js/pixabay-api.js';
import {
  initLightbox,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import iziToast from 'izitoast';

const form = document.querySelector('.form');
const input = document.querySelector('[name="search-text"]');

initLightbox();

form.addEventListener('submit', e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search word',
      position: 'topRight',
    });
    return;
  }

  showLoader();
  clearGallery();

  getImagesByQuery(query)
    .then(data => {
      const hits = Array.isArray(data?.hits) ? data.hits : [];

      if (hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          maxWidth: 432,
          backgroundColor: '#EF4040',
          messageColor: '#fff',
        });
        return;
      }

      createGallery(hits);
    })
    .catch(err => {
      iziToast.error({
        title: 'Error',
        message: err?.message || 'Something went wrong',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
