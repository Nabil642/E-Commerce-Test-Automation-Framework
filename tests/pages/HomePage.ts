import { Page } from '@playwright/test';

export type SortOption = 'name,asc' | 'name,desc' | 'price,asc' | 'price,desc';

export class HomePage {
  constructor(private readonly page: Page) {}

  get productCards() {
    return this.page.locator('a.card');
  }

  get noResultsMessage() {
    return this.page.getByText(/no products found/i);
  }

  async open() {
    await this.page.goto('/');
    await this.productCards.first().waitFor();
  }

  async searchFor(term: string) {
    await this.page.getByTestId('search-query').fill(term);
    const searchDone = this.page.waitForResponse(
      (res) => res.url().includes('/products/search') && res.ok()
    );
    await this.page.getByTestId('search-submit').click();
    await searchDone;
  }

  async sortBy(option: SortOption) {
    const sortDone = this.page.waitForResponse(
      (res) => res.url().includes('sort=') && res.ok()
    );
    await this.page.getByTestId('sort').selectOption(option);
    await sortDone;
  }

  async productNames(): Promise<string[]> {
    const names = await this.page.getByTestId('product-name').allTextContents();
    return names.map((n) => n.trim());
  }

  async productPrices(): Promise<number[]> {
    const prices = await this.page.getByTestId('product-price').allTextContents();
    return prices.map((p) => Number(p.replace(/[^0-9.]/g, '')));
  }

  async openFirstProduct() {
    const name = (await this.productCards.first().getByTestId('product-name').innerText()).trim();
    await this.productCards.first().click();
    return name;
  }
}
