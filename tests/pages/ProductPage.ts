import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  get name() {
    return this.page.getByTestId('product-name');
  }

  get unitPrice() {
    return this.page.getByTestId('unit-price');
  }

  async addToCart() {
    await this.page.getByTestId('add-to-cart').click();
    // the app shows a toast when the item lands in the cart
    await expect(this.page.getByRole('alert').first()).toContainText(/added to shopping cart/i);
  }
}
