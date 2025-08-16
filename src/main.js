import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const PER_PAGE = 15;
const form = document.querySelector('.form');
const input = document.querySelector('[name="search-text"]');
const loadMoreBtn = document.getElementById('load-more');

let currentQuery = '';
let page = 1;
let totalHits = 0;
let isLoading = false;

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(e) {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search word',
      position: 'topRight',
      maxWidth: 432,
    });
    return;
  }

  currentQuery = query;
  page = 1;
  totalHits = 0;

  hideLoadMoreButton();
  clearGallery();

  await fetchAndRender({ isNewSearch: true });
}

async function onLoadMore() {
  if (isLoading) return;
  page += 1;
  await fetchAndRender({ isNewSearch: false });
}

async function fetchAndRender({ isNewSearch }) {
  try {
    isLoading = true;
    showLoader();
    loadMoreBtn.disabled = true;

    const data = await getImagesByQuery(currentQuery, page);
    const hits = Array.isArray(data?.hits) ? data.hits : [];
    totalHits = Number.isFinite(data?.totalHits) ? data.totalHits : 0;

    if (hits.length === 0) {
      hideLoadMoreButton();
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

    const reachedEnd = page * PER_PAGE >= totalHits;
    if (reachedEnd) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        maxWidth: 432,
      });
    } else {
      showLoadMoreButton();
    }

    if (!isNewSearch) smoothScrollByCardHeight();
  } catch (err) {
    hideLoadMoreButton();
    iziToast.error({
      title: 'Error',
      message: err?.message || 'Something went wrong',
      position: 'topRight',
      maxWidth: 432,
    });
  } finally {
    hideLoader();
    loadMoreBtn.disabled = false;
    isLoading = false;
  }
}

function smoothScrollByCardHeight() {
  const firstCard = document.querySelector('.gallery .card');
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}
