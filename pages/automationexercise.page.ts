import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * POM para automationexercise.com - captura formulario Contact Us y carga de archivo.
 */
export class AutomationExercisePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async goContactUs() {
    await this.page.click('a[href="/contact_us"]');
  }

  public async fillContactForm({ name, email, subject, message }: { name: string; email: string; subject: string; message: string; }) {
    await this.page.fill('input[name="name"]', name);
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="subject"]', subject);
    await this.page.fill('textarea[name="message"]', message);
  }

  public async uploadFile(filePath: string) {
    // localizar input file y subir
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
  }

  public async isFileNameVisible(fileName: string) {
    // muchas implementaciones muestran el nombre junto al input; uso contains
    return this.page.locator(`text=${fileName}`).first().isVisible();
  }

  public async submitForm() {
    await this.page.click('input[type="submit"], button[type="submit"], #submit');
  }
}
