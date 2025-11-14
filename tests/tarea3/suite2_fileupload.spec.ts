import { test, expect } from '@playwright/test';
import { AutomationExercisePage } from '../../pages/automationexercise.page';
import { DataHelper } from '../../helpers/dataHelper';
import { WaitHelper } from '../../helpers/waitHelper';
import { Logger } from '../../helpers/logger';
import path from 'path';

test.describe.serial('Suite 2 - Carga de archivos en AutomationExercise', () => {
  test('Completar contacto y subir archivo .txt', async ({ page }) => {
    const pageAE = new AutomationExercisePage(page);
    const wait = new WaitHelper(page);
    const data = DataHelper.getRandomContactData();

    // Pasamos test.info() a Logger para que el helper pueda escribir trazabilidad por test
    await Logger.log('Navegando a automationexercise.com', test.info());
    await pageAE.goto('https://automationexercise.com/');
    await expect(page).toHaveTitle(/Automation/);

    await pageAE.goContactUs();
    await expect(page.url()).toContain('contact_us');
    await wait.waitVisible('form');

    await pageAE.fillContactForm(data);
    await Logger.log('Formulario rellenado con datos aleatorios', test.info());
    await wait.sleep(2000);

    const filePath = path.resolve('assets', 'testfile.txt');
    await pageAE.uploadFile(filePath);
    await wait.sleep(2000);
    await Logger.log('Archivo subido: ' + filePath, test.info());

    // Nueva validación robusta: leer input.files primero, fallback a buscar texto visible
    const uploadedName = await pageAE.getUploadedFileName();
    if (uploadedName) {
      await expect(uploadedName).toContain('testfile.txt');
      await wait.sleep(2000);
    } else {
      // Fallback: comprobar si la página muestra el nombre del archivo (algunas UIs lo hacen)
      const visible = await pageAE.isFileNameVisible('testfile.txt');
      await expect(visible).toBeTruthy();
      await wait.sleep(2000);
    }

    await pageAE.submitForm();
    await Logger.log('Formulario enviado', test.info());
    await page.screenshot({ path: 'tests/tarea3/artifacts/contact_submission.png' });
  });
});