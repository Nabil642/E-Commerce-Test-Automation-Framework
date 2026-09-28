import { test, expect } from '../fixtures';
import { API_URL } from '../utils/env';

// A small hybrid check: what the browser shows should match what the backend returns.
test('home page shows as many products as the API returns for page 1', async ({ homePage, request }) => {
  const apiResponse = await request.get(`${API_URL}/products?page=1`);
  expect(apiResponse.ok()).toBeTruthy();
  const body = await apiResponse.json();

  await homePage.open();

  await expect(homePage.productCards).toHaveCount(body.data.length);
});
