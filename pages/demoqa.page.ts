import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * POM de demoqa.com - se usan selectores robustos para los tests de Alert/Confirm/Prompt.
 */
export class DemoQAPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async openAlertsSection() {
  // seleccionar el card Alerts, Frame & Windows
    await this.page.locator('div.card-body h5:has-text("Alerts, Frame & Windows")').first().click();
  // click en el menu lateral "Alerts"
    await this.page.locator('li:has-text("Alerts")').first().click();
  }

  public async clickAlertButton() {
    await this.page.click('#alertButton');
  }

  public async clickTimerAlertButton() {
    await this.page.click('#timerAlertButton');
  }

  public async clickConfirmButton() {
    await this.page.click('#confirmButton');
  }

  public async clickPromptButton() {
    await this.page.click('#promtButton');
  }

  public async isConfirmResultVisible() {
    return this.page.isVisible('#confirmResult');
  }

  public async isPromptResultVisible() {
    return this.page.isVisible('#promptResult');
  }
}
