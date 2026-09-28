import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';

type Pages = {
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  loginPage: LoginPage;
};

// Every test gets ready-made page objects, so specs stay short and readable
export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
});

export { expect } from '@playwright/test';
