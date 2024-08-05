import { createCookieSessionStorage } from '@remix-run/node';
import { Issuer, Strategy } from 'openid-client';

const authIssuer = import.meta.env.VITE_AUTH_ISSUER;
const client_id = import.meta.env.VITE_AUTH_ID;
const client_secret = import.meta.env.VITE_AUTH_SECRET;
const sessionSecret = import.meta.env.VITE_AUTH_SESSION_SECRET;
const redirectUri = import.meta.env.VITE_AUTH_REDIRECT_URI;
const env = import.meta.env.VITE_CONTENT_URL;

const issuer = await Issuer.discover(authIssuer);
const client = new issuer.Client({
  client_id,
  client_secret,
  redirect_uris: [redirectUri],
  response_types: ['code'],
});

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: 'generate-animal-cookie',
    secure: env === 'production',
    maxAge: 60 * 60, // 1 hour
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
  },
});

export const getClient = () => client;
