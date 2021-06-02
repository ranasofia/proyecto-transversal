/**
 * Clase que posee los atributos necesarios para añadir un producto al carrito
 */
export class Carro{

  /**
   * Es el número identificador del producto
   */
  producto_id: number;

  /**
   * Es la cantidad de existencias a comprar del producto
   */
  cantidad: number;

  /**
   * Es el precio unitario del producto
   */
  precio: number;

  /**
   * Es el valor total del pedido según la cantidad de existencias a comprar
   */
  total: number;

  /**
   * Es el número identificador del usuario que va a realizar el pedido
   */
  user_id: number;

  /**
   * Es la imagen del producto
   */
  imagen: string;

}
