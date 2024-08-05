import { redirect } from '@remix-run/react';
import { getClient } from '~/auth.server';

export const loader = async () => {
  const client = getClient();
  const authorizationUrl = client.authorizationUrl({
    scope: 'openid profile email',
  });
  return redirect(authorizationUrl);
};
