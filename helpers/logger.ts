import fs from 'fs';
import path from 'path';
import type { TestInfo } from '@playwright/test';

/**
 * Logger helper que realiza trazabilidad simple y guarda mensajes en archivo de logs por test.
 * Protege el nombre de la prueba sanitizando caracteres inválidos para Windows/Linux.
 */
export class Logger {
  private static ensureDir(dir: string) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  /**
   * Reemplaza caracteres inválidos en nombres de fichero por '_'.
   * Elimina caracteres de control y limita la longitud.
   * @param name Nombre original (p. ej. test.info().title)
   */
  private static sanitizeName(name: string): string {
    if (!name) return 'unknown_test';
    // Reemplaza caracteres inválidos en Windows: <>:"/\\|?* y control chars \x00-\x1F
    const cleaned = name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
    // Normalizar espacios consecutivos y recortar longitud razonable
    return cleaned.replace(/\s+/g, '_').slice(0, 200);
  }

  /**
   * Registra un mensaje tanto en consola como en el archivo de logs del test que se está ejecutando.
   * @param message Mensaje a registrar.
   * @param info Optional TestInfo obtenido desde test.info().
   */
  public static async log(message: string, info?: TestInfo) {
    const rawTitle = info?.title ?? 'unknown_test';
    const safeTitle = Logger.sanitizeName(rawTitle);
    const dir = path.join('tests', 'tarea3', 'artifacts', safeTitle);
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