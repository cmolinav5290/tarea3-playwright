import { Page } from '@playwright/test';

/**
 * Helper con utilidades de espera explícita.
 * Seguro frente a page null/undefined (usa fallback setTimeout).
 */
export class WaitHelper {
  private page?: Page;

  constructor(page?: Page) {
    this.page = page;
  }

  /**
   * Espera explícita hasta que el título contenga el texto indicado.
   * No hace nada si no hay page disponible.
   */
  public async waitTitleContains(expected: string) {
    if (!this.page) return;
    await this.page.waitForFunction(
      (expectedTitle: string) => document.title.includes(expectedTitle),
      expected
    );
  }

  /**
   * Espera visible un selector CSS.
   * No hace nada si no hay page disponible.
   */
  public async waitVisible(selector: string) {
    if (!this.page) return;
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  /**
   * Pausa la ejecución por ms milisegundos.
   * Usa page.waitForTimeout si page está disponible; si no, usa setTimeout.
   * @param ms Milisegundos a esperar
   */
  public async sleep(ms: number) {
    if (this.page && typeof this.page.waitForTimeout === 'function') {
      await this.page.waitForTimeout(ms);
    } else {
      // Fallback seguro para evitar TypeError
      await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
    }
  }

  /**
   * Versión estática si quieres usar sin instanciar.
   */
  public static async sleepStatic(ms: number) {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
  }
}