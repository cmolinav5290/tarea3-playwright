import { faker } from '@faker-js/faker';

/**
 * Data helper que entrega datos aleatorios y data-driven para las pruebas.
 */
export class DataHelper {
  /**
   * Genera datos aleatorios para formulario de contacto.
   * @returns objeto con name, email, subject y message
   */
  public static getRandomContactData() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      subject: `Consulta ${faker.number.int({ min: 1, max: 1000 })}`,
      message: faker.lorem.paragraph()
    };
  }
}

/**
 * Data-driven para suite de SauceDemo.
 * pick: índices de productos a agregar (0-based)
 * sort: filtro de ordenamiento a aplicar en inventory
 * expectedBadge: número de productos esperados en carrito
 */
export const sauceCases = [
  { name: 'case-1', sort: 'az', pick: [0, 1], expectedBadge: 2 },
  { name: 'case-2', sort: 'za', pick: [2], expectedBadge: 1 },
  { name: 'case-3', sort: 'lohi', pick: [0, 3, 4], expectedBadge: 3 }
];
