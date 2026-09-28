import { test, expect } from '../fixtures';
import { CUSTOMER } from '../utils/env';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('customer can log in with valid credentials @smoke', async ({ page, loginPage }) => {
    await loginPage.login(CUSTOMER.email, CUSTOMER.password);

    await expect(page).toHaveURL(/\/account/);
    await expect(page.getByTestId('page-title')).toContainText('My account');
    await expect(page.getByTestId('nav-menu')).toContainText(CUSTOMER.fullName);
  });

  test('wrong password is rejected', async ({ page, loginPage }) => {
    await loginPage.login(CUSTOMER.email, 'not-the-right-password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(/invalid email or password/i);
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('empty form shows validation errors', async ({ page, loginPage }) => {
    await loginPage.login('', '');

    await expect(page.getByTestId('email-error')).toBeVisible();
    await expect(page.getByTestId('password-error')).toBeVisible();
  });
});
