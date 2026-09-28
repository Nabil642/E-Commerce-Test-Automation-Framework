import { test, expect } from '../fixtures';

test.describe('Shopping cart', () => {
  test('adds a product and shows it in the cart @smoke', async ({ homePage, productPage, cartPage }) => {
    await homePage.open();
    const chosenName = await homePage.openFirstProduct();

    await expect(productPage.name).toContainText(chosenName);
    await productPage.addToCart();
    await expect(cartPage.cartBadge).toHaveText('1');

    await cartPage.open();
    await expect(cartPage.productTitles).toHaveCount(1);
    await expect(cartPage.productTitles.first()).toContainText(chosenName);
  });

  test('cart total goes up when the quantity changes', async ({ homePage, productPage, cartPage }) => {
    await homePage.open();
    await homePage.openFirstProduct();
    await productPage.addToCart();
    await cartPage.open();

    const totalBefore = Number((await cartPage.total.innerText()).replace(/[^0-9.]/g, ''));
    await cartPage.setQuantity(3);

    await expect(async () => {
      const totalAfter = Number((await cartPage.total.innerText()).replace(/[^0-9.]/g, ''));
      expect(totalAfter).toBeCloseTo(totalBefore * 3, 1);
    }).toPass();
  });
});
