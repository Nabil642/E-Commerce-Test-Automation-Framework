import { test, expect } from '../fixtures';

test.describe('Product search', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('finds products that match the search term @smoke', async ({ homePage }) => {
    await homePage.searchFor('hammer');

    await expect(homePage.productCards.first()).toBeVisible();
    const names = await homePage.productNames();
    expect(names.length).toBeGreaterThan(0);
    expect(names.some((n) => /hammer/i.test(n))).toBe(true);
  });

  test('shows a friendly message when nothing matches', async ({ homePage }) => {
    await homePage.searchFor('zzzxxyy');

    await expect(homePage.noResultsMessage).toBeVisible();
    await expect(homePage.productCards).toHaveCount(0);
  });

  test('search is not case sensitive', async ({ homePage }) => {
    await homePage.searchFor('PLIERS');

    await expect(homePage.productCards.first()).toBeVisible();
    const names = await homePage.productNames();
    expect(names.some((n) => /pliers/i.test(n))).toBe(true);
  });
});
