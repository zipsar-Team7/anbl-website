const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://anbl-backend.onrender.com/api');

export const API_ENDPOINTS = {
  SEARCH: `${BASE_URL}/search`,
  FILTERS: `${BASE_URL}/filters`,
  RECORDS: `${BASE_URL}/records`,
  CITATIONS: `${BASE_URL}/citations`,
  HEALTH: `${BASE_URL}/health`,
};

export default BASE_URL;
