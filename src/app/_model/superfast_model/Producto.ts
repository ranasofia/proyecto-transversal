/**
 * Clase que representa los productos de SuperFast
 */
export class Producto{

  /**
   * Es el valor numérico que diferencia a un producto de otro
   */
  id: number;

  /**
   * Es el nombre del producto
   */
  nombre_producto: string;

  /**
   * Es la descripción adicional de un producto
   */
  descripcion_producto: string;

  /**
   * Es el precio del producto en pesos colombianos
   */
  precio_producto: number;

  /**
   * Es la imagen del producto
   */
  imagen_producto1: string;

  /**
   * Es el valor numérico que indica la disponibilidad del producto
   */
  estado_producto: number;

  /**
   * Es el valor numérico que indica a qué empresa aliada pertenece el producto
   */
  id_aliado: number;

  /**
   * Es el nombre de la empresa aliada a la que pertenece el producto
   */
  nombre_aliado: string;

  /**
   * Es la actividad cometcial de la empresa aliada
   */
  actividad_comercial: string;

  /**
   * Es la cantidad de existencias disponibles del producto
   */
  cantidad: number;

}
