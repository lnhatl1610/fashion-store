import type { Request, Response } from "express";

export type AuthClient = "admin" | "storefront";

const REFRESH_COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
const COOKIE_CLEAR_EXPIRY = "Thu, 01 Jan 1970 00:00:00 GMT";

const getCookieName = (client: AuthClient) => `shopco_${client}_refresh_token`;

export const getAuthClient = (request: Request): AuthClient => {
  return request.get("X-Client-App") === "admin" ? "admin" : "storefront";
};

const getCookieAttributes = (maxAge: number) => {
  const sameSite = process.env.AUTH_COOKIE_SAME_SITE === "none" ? "None" : "Lax";
  const secure = process.env.NODE_ENV === "production" || sameSite === "None";

  return [
    "Path=/",
    "HttpOnly",
    `SameSite=${sameSite}`,
    `Max-Age=${maxAge}`,
    ...(secure ? ["Secure"] : []),
  ];
};

export const setRefreshTokenCookie = (response: Response, client: AuthClient, token: string) => {
  const cookie = [
    `${getCookieName(client)}=${encodeURIComponent(token)}`,
    ...getCookieAttributes(REFRESH_COOKIE_MAX_AGE_SECONDS),
  ].join("; ");

  response.setHeader("Set-Cookie", cookie);
};

export const clearRefreshTokenCookie = (response: Response, client: AuthClient) => {
  const cookie = [
    `${getCookieName(client)}=`,
    ...getCookieAttributes(0),
    `Expires=${COOKIE_CLEAR_EXPIRY}`,
  ].join("; ");

  response.setHeader("Set-Cookie", cookie);
};

export const getRefreshTokenCookie = (request: Request, client: AuthClient): string | null => {
  const cookieHeader = request.headers.cookie;
  if (!cookieHeader) return null;

  const cookieName = getCookieName(client);
  for (const cookie of cookieHeader.split(";")) {
    const separatorIndex = cookie.indexOf("=");
    if (separatorIndex === -1) continue;

    const name = cookie.slice(0, separatorIndex).trim();
    if (name !== cookieName) continue;

    return decodeURIComponent(cookie.slice(separatorIndex + 1).trim());
  }

  return null;
};
