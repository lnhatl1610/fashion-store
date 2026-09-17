const ACCESS_TOKEN_KEY = "shopco_access_token";
const LEGACY_REFRESH_TOKEN_KEY = "shopco_refresh_token";
localStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
let accessToken: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);

export const authToken = {
  get: () => accessToken,
  set: (token: string) => { accessToken = token; localStorage.setItem(ACCESS_TOKEN_KEY, token); },
  clear: () => { accessToken = null; localStorage.removeItem(ACCESS_TOKEN_KEY); localStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY); },
};
