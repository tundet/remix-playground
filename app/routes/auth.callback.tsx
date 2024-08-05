import { redirect } from '@remix-run/react';
import { getClient, getSession, commitSession } from '~/auth.server';

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const client = getClient();
  const redirectUri = import.meta.env.VITE_AUTH_REDIRECT_URI;

  if (!code) {
    return redirect('/');
  }

  const tokenSet = await client.callback(redirectUri, { code });
  const session = await getSession(request.headers.get('Cookie'));

  session.set('user', tokenSet.claims());
  return redirect('/generate-animal/en-US', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
