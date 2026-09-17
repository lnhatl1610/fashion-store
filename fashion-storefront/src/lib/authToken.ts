const ACCESS_TOKEN_KEY = "shopco_access_token";
const REFRESH_TOKEN_KEY = "shopco_refresh_token";
let accessToken: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);

export const authToken = {
  get: () => accessToken,
  set: (token: string) => { accessToken = token; localStorage.setItem(ACCESS_TOKEN_KEY, token); },
  getRefresh: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefresh: (token: string) => { localStorage.setItem(REFRESH_TOKEN_KEY, token); },
  clear: () => { accessToken = null; localStorage.removeItem(ACCESS_TOKEN_KEY); localStorage.removeItem(REFRESH_TOKEN_KEY); },
};
