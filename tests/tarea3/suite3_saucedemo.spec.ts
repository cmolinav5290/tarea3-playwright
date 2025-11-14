import { test, expect } from '@playwright/test';
import { SauceDemoPage } from '../../pages/saucedemo.page';
import { sauceCases } from '../../helpers/dataHelper';
import { Logger } from '../../helpers/logger';
import { WaitHelper } from '../../helpers/waitHelper';

const wait = new WaitHelper(null as any); // Placeholder, usaremos page del test

test.describe.serial('Suite 3 - Data-driven: selección de productos en SauceDemo', () => {
  for (const c of sauceCases) {
    test(`Caso: ${c.name} - pick=${JSON.stringify(c.pick)}`, async ({ page }) => {
      const sauce = new SauceDemoPage(page);

      // Registrar inicio de caso con TestInfo
      await Logger.log(`Iniciando caso ${c.name}`, test.info());

      await sauce.goto('https://www.saucedemo.com');
      await sauce.login('standard_user', 'secret_sauce');
      await wait.sleep(2000);
      await expect(page).toHaveURL(/inventory/);
      await Logger.log('Login exitoso, en inventory.', test.info());
      await wait.sleep(2000);

      const sortMap: Record<string, string> = { az: 'az', za: 'za', lohi: 'lohi', hilo: 'hilo' };
      const sortVal = sortMap[c.sort] ?? c.sort;
      await sauce.sortBy(sortVal);
      await Logger.log(`Orden aplicado: ${sortVal}`, test.info());
      await wait.sleep(2000);

      for (const idx of c.pick) {
        await sauce.addToCartByIndex(idx);
        await Logger.log(`Producto indice ${idx} agregado`, test.info());
        await wait.sleep(1000);
      }

      const badge = await sauce.getCartBadgeCount();
      await expect(badge).toBe(c.expectedBadge);
      await Logger.log(`Badge en carrito: ${badge}`, test.info());
      await wait.sleep(2000);

      // Continuar flujo checkout
      await sauce.goToCart();
      await sauce.checkoutAndFinish({ firstName: 'Test', lastName: 'User', postalCode: '00000' });
      await wait.sleep(2000);
      await page.screenshot({ path: `tests/tarea3/artifacts/${c.name}_finished.png` });
      await Logger.log(`Flujo checkout finalizado para ${c.name}`, test.info());
    });
  }
});