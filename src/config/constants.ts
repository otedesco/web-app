export const AUTH_SERVER_API =
  process.env.AUTH_SERVER_API ?? "http://127.0.0.1:8000/cerberus/v1";

export const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export const TOKEN_EXPIRE = 7 * 24 * 60 * 60;
export const SESSION_EXPIRE = 15 * 24 * 60 * 60;

export const ACCESS_TOKEN_COOKIE_OPTIONS = {
  expires: new Date(Date.now() + TOKEN_EXPIRE * 100),
  maxAge: TOKEN_EXPIRE * 100,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" || false,
};

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  ...ACCESS_TOKEN_COOKIE_OPTIONS,
  expires: new Date(Date.now() + SESSION_EXPIRE * 100),
  maxAge: SESSION_EXPIRE * 100,
};
