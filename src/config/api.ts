export const API_TOKEN = import.meta.env.VITE_REACT_APP_GH_TOKEN;

export const config = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export const API_BASE_URL = 'https://api.github.com/';
