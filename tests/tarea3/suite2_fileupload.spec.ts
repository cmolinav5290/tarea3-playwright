import { test, expect } from '@playwright/test';
import { AutomationExercisePage } from '../../pages/automationexercise.page';
import { DataHelper } from '../../helpers/dataHelper';
import { WaitHelper } from '../../helpers/waitHelper';
import { Logger } from '../../helpers/logger';
import path from 'path';

test.describe('Suite 2 - Carga de archivos en AutomationExercise', () => {
  test('Completar contacto y subir archivo .txt', async ({ page }) => {
    const pageAE = new AutomationExercisePage(page);
    const wait = new WaitHelper(page);
    const data = DataHelper.getRandomContactData();

    await Logger.log('Navegando a automationexercise.com');
    await pageAE.goto('https://automationexercise.com/');
    await expect(page).toHaveTitle(/Automation/);
    await pageAE.goContactUs();
    await expect(page.url()).toContain('contact_us');
    await wait.waitVisible('form');

    await pageAE.fillContactForm(data);
    await Logger.log('Formulario rellenado con datos aleatorios');

    const filePath = path.resolve('assets', 'testfile.txt');
    await pageAE.uploadFile(filePath);
    await Logger.log('Archivo subido: ' + filePath);
    await expect(await pageAE.isFileNameVisible('testfile.txt')).toBeTruthy();

    await pageAE.submitForm();
    await Logger.log('Formulario enviado');
    await page.screenshot({ path: 'tests/tarea3/artifacts/contact_submission.png' });
  });
});
