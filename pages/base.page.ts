import { Page } from '@playwright/test';

/**
 * BasePage con utilidades comunes.
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega a una url y espera carga básica.
   * @param url Url destino
   */
  public async goto(url: string) {
    await this.page.goto(url);
  }
}
