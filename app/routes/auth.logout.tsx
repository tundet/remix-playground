import { redirect } from '@remix-run/react';
import { destroySession, getSession } from '~/auth.server';

export const loader = async ({ request }: { request: Request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const cookies = await destroySession(session);

  return redirect('/', {
    headers: {
      'Set-Cookie': cookies,
    },
  });
};
