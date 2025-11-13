import { testInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';

/**
 * Logger helper que realiza trazabilidad simple y guarda mensajes en archivo de logs por test.
 */
export class Logger {
  private static ensureDir(dir: string) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  /**
   * Registra un mensaje simple tanto en consola como en el archivo de logs del test que se está ejecutando.
   * @param message Mensaje a registrar.
   */
  public static async log(message: string) {
    const info = testInfo();
    const dir = path.join('tests', 'tarea3', 'artifacts', info.title.replace(/\s+/g, '_'));
    Logger.ensureDir(dir);
    const file = path.join(dir, 'trace.log');
    const ts = new Date().toISOString();
    const line = `${ts} - ${message}\n`;
    fs.appendFileSync(file, line);
    // además imprimir en consola para visibilidad en CI
    // eslint-disable-next-line no-console
    console.log(`${ts} - ${message}`);
  }
}
