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

  /**
   * Sube un archivo al input file de la página.
   * @param filePath Ruta local al archivo que se subirá.
   */
  public async uploadFile(filePath: string) {
    const fileInput = this.page.locator('input[type="file"]');
    // Asegurarse que el input existe y es visible (algunas UI ocultan el input)
    await fileInput.waitFor({ state: 'attached', timeout: 5000 });
    await fileInput.setInputFiles(filePath);
  }

  /**
   * Obtiene el nombre del archivo cargado leyendo la propiedad files del input.
   * @returns Nombre del primer archivo cargado o empty string si ninguno.
   */
  public async getUploadedFileName(): Promise<string> {
    const fileInput = this.page.locator('input[type="file"]');
    if (await fileInput.count() === 0) return '';
    const name = await fileInput.evaluate((el: HTMLInputElement) => {
      // @ts-ignore - acceder a .files en tiempo de ejecución del browser
      if (el.files && el.files.length > 0) return el.files[0].name;
      return '';
    });
    return name ?? '';
  }

  /**
   * Valida si el nombre del archivo aparece como cargado.
   * Primero revisa input.files, si no encuentra intenta buscar texto visible con el nombre en la página
   * (por si la UI muestra el nombre fuera del input).
   * @param fileName Nombre esperado del archivo (ej: 'testfile.txt')
   */
  public async isFileNameVisible(fileName: string): Promise<boolean> {
    const uploaded = await this.getUploadedFileName();
    if (uploaded && uploaded.includes(fileName)) return true;

    // Fallback: buscar texto visible en la página que contenga el nombre del archivo
    try {
      return await this.page.locator(`text=${fileName}`).first().isVisible();
    } catch {
      return false;
    }
  }

  public async submitForm() {
    await this.page.click('input[type="submit"], button[type="submit"], #submit');
  }
}