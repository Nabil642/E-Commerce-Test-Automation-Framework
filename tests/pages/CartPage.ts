import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  get cartBadge() {
    return this.page.getByTestId('cart-quantity');
  }

  get productTitles() {
    return this.page.getByTestId('product-title');
  }

  get quantityInputs() {
    return this.page.getByTestId('product-quantity');
  }

  get total() {
    return this.page.getByTestId('cart-total');
  }

  async open() {
    await this.page.getByTestId('nav-cart').click();
    await this.page.waitForURL('**/checkout');
  }

  async setQuantity(qty: number) {
    await this.quantityInputs.first().fill(String(qty));
    await this.quantityInputs.first().blur();
  }
}
