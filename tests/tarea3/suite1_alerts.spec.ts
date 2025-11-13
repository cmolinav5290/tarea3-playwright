import { test, expect } from '@playwright/test';
import { DemoQAPage } from '../../pages/demoqa.page';
import { AlertHelper } from '../../helpers/alertHelper';
import { WaitHelper } from '../../helpers/waitHelper';
import { Logger } from '../../helpers/logger';

test.describe('Suite 1 - Gestión de diálogos nativos', () => {
  test('Interacción con alert / confirm / prompt en demoqa', async ({ page }) => {
    const demo = new DemoQAPage(page);
    const wait = new WaitHelper(page);
    const alert = new AlertHelper(page);

    await Logger.log('Navegando a demoqa.com');
    await demo.goto('https://demoqa.com');
    await expect(page).toHaveTitle(/DEMOQA/);
    await wait.waitTitleContains('DEMOQA');

    await demo.openAlertsSection();
    await Logger.log('Se abrió la sección Alerts');

    // Alert simple
    await alert.handleNextDialog(true);
    await demo.clickAlertButton();
    await page.screenshot({ path: 'tests/tarea3/artifacts/alert_simple.png' });

    // Timer alert (aparece con delay)
    await alert.handleNextDialog(true);
    await demo.clickTimerAlertButton();
    await page.screenshot({ path: 'tests/tarea3/artifacts/alert_timer.png' });

    // Confirm - aceptar y validar resultado visible
    await alert.handleNextDialog(true);
    await demo.clickConfirmButton();
    await expect(await demo.isConfirmResultVisible()).toBeTruthy();
    await page.screenshot({ path: 'tests/tarea3/artifacts/alert_confirm.png' });

    // Prompt - ingresar "Grupo ##" donde ## será 03 (ejemplo)
    const grupo = 'Grupo 03';
    await alert.handleNextDialog(true, grupo);
    await demo.clickPromptButton();
    await expect(await demo.isPromptResultVisible()).toBeTruthy();
    await page.screenshot({ path: 'tests/tarea3/artifacts/alert_prompt.png' });
  });
});
