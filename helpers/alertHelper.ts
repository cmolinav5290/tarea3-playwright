import { Page } from '@playwright/test';
import { Logger } from './logger';

/**
 * Utilidad para gestionar diálogos nativos (alert/confirm/prompt) en Playwright.
 */
export class AlertHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Registra un manejador temporal para el próximo dialogo.
   * - accept: si es confirm => acepta.
   * - promptText: si es prompt => envía el texto.
   *
   * @param accept True para aceptar (o ingresar texto si prompt), false para dismiss.
   * @param promptText Texto para prompts (si aplica).
   */
  public async handleNextDialog(accept = true, promptText?: string) {
    this.page.once('dialog', async dialog => {
      const type = dialog.type(); // 'alert'|'confirm'|'prompt'
      await Logger.log(`Dialog tipo ${type} detectado con mensaje: ${dialog.message()}`);
      try {
        if (type === 'prompt') {
          await dialog.accept(promptText ?? '');
          await Logger.log(`Prompt aceptado con texto: ${promptText}`);
        } else if (type === 'confirm') {
          if (accept) {
            await dialog.accept();
            await Logger.log('Confirm aceptado.');
          } else {
            await dialog.dismiss();
            await Logger.log('Confirm cancelado.');
          }
        } else {
          // alert
          await dialog.accept();
          await Logger.log('Alert aceptada.');
        }
      } catch (err) {
        await Logger.log(`Error gestionando dialogo: ${String(err)}`);
      }
    });
  }
}
