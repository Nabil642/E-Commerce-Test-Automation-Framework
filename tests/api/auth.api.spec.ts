import { test, expect } from '@playwright/test';
import { CUSTOMER } from '../utils/env';

test.describe('Authentication API', () => {
  test('valid credentials return a bearer token', async ({ request }) => {
    const response = await request.post('/users/login', {
      data: { email: CUSTOMER.email, password: CUSTOMER.password },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.access_token).toBeTruthy();
    expect(body.token_type).toMatch(/bearer/i);
  });

  test('wrong password gives 401 and no token', async ({ request }) => {
    const response = await request.post('/users/login', {
      data: { email: CUSTOMER.email, password: 'wrong-password' },
    });

    expect(response.status()).toBe(401);
    expect(await response.text()).not.toContain('access_token');
  });

  test('token unlocks the profile endpoint', async ({ request }) => {
    const login = await request.post('/users/login', {
      data: { email: CUSTOMER.email, password: CUSTOMER.password },
    });
    const { access_token } = await login.json();

    const profile = await request.get('/users/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    expect(profile.status()).toBe(200);
    expect((await profile.json()).email).toBe(CUSTOMER.email);
  });

  test('profile endpoint rejects anonymous requests', async ({ request }) => {
    const response = await request.get('/users/me');
    expect(response.status()).toBe(401);
  });
});
