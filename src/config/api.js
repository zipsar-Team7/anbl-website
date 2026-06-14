const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://anbl-backend.onrender.com/api');

export const API_ENDPOINTS = {
  SEARCH: `${BASE_URL}/search`,
  FILTERS: `${BASE_URL}/filters`,
  RECORDS: `${BASE_URL}/records`,
  CITATIONS: `${BASE_URL}/citations`,
  HEALTH: `${BASE_URL}/health`,
  POLYTOX_SEARCH: `${BASE_URL}/polytox/search`,
  POLYTOX_FILTERS: `${BASE_URL}/polytox/filters`,
  POLYTOX_RECORDS: `${BASE_URL}/polytox/records`,
  POLYTOX_PREDICT: `${BASE_URL}/polytox/predict`,
  POLYTOX_METADATA: `${BASE_URL}/polytox/metadata`,
  POLYTOX_SUGGEST: `${BASE_URL}/polytox/suggest`,
};

export default BASE_URL;
