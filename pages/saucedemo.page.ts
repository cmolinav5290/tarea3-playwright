import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * POM para www.saucedemo.com: login, inventory, carrito y checkout.
 */
export class SauceDemoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  public async isInventoryUrl() {
    return this.page.url().includes('inventory');
  }

  public async sortBy(option: string) {
    // mapear opciones amigables a valores del select
    const map: Record<string, string> = {
      az: 'az',
      za: 'za',
      lohi: 'lohi',
      hilo: 'hilo'
    };
    // Playwright: seleccionar por valor visible
    await this.page.selectOption('.product_sort_container', { value: option });
  }

  public async addToCartByIndex(index: number) {
    const item = this.page.locator('.inventory_item').nth(index);
    await item.locator('button:has-text("Add to cart")').click();
  }

  public async getCartBadgeCount() {
    const el = this.page.locator('.shopping_cart_badge');
    if (await el.count() === 0) return 0;
    const text = await el.innerText();
    return parseInt(text, 10);
  }

  public async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  public async checkoutAndFinish({ firstName, lastName, postalCode }: { firstName: string; lastName: string; postalCode: string; }) {
    await this.page.click('button:has-text("Checkout")');
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', postalCode);
    await this.page.click('#continue');
    await this.page.click('button:has-text("Finish")');
  }
}
