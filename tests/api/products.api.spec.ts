import { test, expect } from '@playwright/test';

test.describe('Products API', () => {
  test('GET /products returns a paginated list', async ({ request }) => {
    const response = await request.get('/products?page=1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.current_page).toBe(1);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.total).toBeGreaterThan(body.data.length - 1);
  });

  test('every product has the fields the UI depends on', async ({ request }) => {
    const body = await (await request.get('/products?page=1')).json();

    for (const product of body.data) {
      expect(product).toHaveProperty('id');
      expect(typeof product.name).toBe('string');
      expect(Number(product.price)).toBeGreaterThan(0);
    }
  });

  test('GET /products/search finds hammers', async ({ request }) => {
    const response = await request.get('/products/search', { params: { q: 'hammer' } });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    const names: string[] = body.data.map((p: { name: string }) => p.name.toLowerCase());
    expect(names.some((n) => n.includes('hammer'))).toBe(true);
  });

  test('searching for gibberish returns an empty list, not an error', async ({ request }) => {
    const response = await request.get('/products/search', { params: { q: 'zzzxxyy' } });
    expect(response.status()).toBe(200);
    expect((await response.json()).data).toEqual([]);
  });

  test('GET /products/{id} returns the same product that the list gave us', async ({ request }) => {
    const list = await (await request.get('/products?page=1')).json();
    const first = list.data[0];

    const detail = await request.get(`/products/${first.id}`);
    expect(detail.status()).toBe(200);
    expect((await detail.json()).name).toBe(first.name);
  });

  test('brands and categories are available', async ({ request }) => {
    for (const path of ['/brands', '/categories']) {
      const response = await request.get(path);
      expect(response.status(), `${path} should respond with 200`).toBe(200);
      expect((await response.json()).length).toBeGreaterThan(0);
    }
  });
});
