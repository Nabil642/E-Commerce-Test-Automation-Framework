import { test, expect } from '../fixtures';

test.describe('Sorting the catalog', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('sorts by name A to Z', async ({ homePage }) => {
    await homePage.sortBy('name,asc');

    // the list re-renders after the API call, so retry until it settles
    await expect(async () => {
      const names = await homePage.productNames();
      const expected = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).toEqual(expected);
    }).toPass();
  });

  test('sorts by price low to high', async ({ homePage }) => {
    await homePage.sortBy('price,asc');

    await expect(async () => {
      const prices = await homePage.productPrices();
      const expected = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(expected);
    }).toPass();
  });

  test('sorts by price high to low', async ({ homePage }) => {
    await homePage.sortBy('price,desc');

    await expect(async () => {
      const prices = await homePage.productPrices();
      const expected = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(expected);
    }).toPass();
  });
});
