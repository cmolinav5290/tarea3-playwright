import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  // Aumenta timeout global si vas a ralentizar mucho
  timeout: 300_000,
  expect: { timeout: 10_000 },

  // Forzar ejecución secuencial entre tests en toda la suite
  workers: 1,

  use: {
    // Mostrar navegador (no headless) para ver la ejecución
    headless: false,
    launchOptions: { slowMo: 1000 },
    trace: 'on',
    // Retardo entre acciones (ms). 1000ms = 1 segundo entre acciones.
    // Sin límite por acción (puedes dejar 0)
    actionTimeout: 0,
    // Opciones visuales
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        launchOptions: { slowMo: 1000 }
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        launchOptions: { slowMo: 1000 }
      }
    }
  ]
};

export default config;