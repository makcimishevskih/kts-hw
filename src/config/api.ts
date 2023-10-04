export const API_TOKEN = process.env.REACT_APP_WEBPACK_GH_TOKEN;

export const config = {
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export const API_BASE_URL = 'https://api.github.com/';
