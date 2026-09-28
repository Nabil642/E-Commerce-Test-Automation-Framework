import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  get errorMessage() {
    return this.page.getByTestId('login-error');
  }

  async open() {
    await this.page.goto('/auth/login');
  }

  async login(email: string, password: string) {
    await this.page.getByTestId('email').fill(email);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-submit').click();
  }
}
