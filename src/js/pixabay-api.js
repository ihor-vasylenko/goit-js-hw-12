import axios from 'axios';

const API_KEY = '51689277-952578acec101f907b5d40375';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

const DEFAULT_PARAMS = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: PER_PAGE,
};

export async function getImagesByQuery(query, page = 1) {
  const q = String(query || '').trim();
  const params = { ...DEFAULT_PARAMS };
  params.q = q;
  params.page = page;
  const { data } = await axios.get(BASE_URL, { params });
  return data;
}
