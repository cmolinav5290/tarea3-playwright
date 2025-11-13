import { Page } from '@playwright/test';

/**
 * Helper con utilidades de espera explicita.
 */
export class WaitHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Espera explícita hasta que el título contenga el texto indicado.
   * @param expected Texto esperado en el título
   */
  public async waitTitleContains(expected: string) {
    await this.page.waitForFunction(
      (expectedTitle: string) => document.title.includes(expectedTitle),
      expected
    );
  }

  /**
   * Espera visible un selector CSS.
   * @param selector Selector a esperar visible
   */
  public async waitVisible(selector: string) {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }
}
