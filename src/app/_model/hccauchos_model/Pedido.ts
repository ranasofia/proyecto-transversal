/**
 * Clase que posee los datos del pedido
 */
export class Pedido{

  /**
   * Es el número identificador del carrito al cual se añadirá el pedido
   */
  id_Carrito: number;

  /**
   * Es el número identificador del usuario que realizará el pedido
   */
  user_id: number;

  /**
   * Es el número identificador del producto que se agregará al pedido
   */
  producto_id: number;

  /**
   * Es la cantidad de existencias del pedido
   */
  cantidad: number;

  /**
   * Es la fecha en la que se llevó a cabo el pedido
   */
  fecha: Date;

  /**
   * Es el valor unitario del pedido
   */
  precio: number;

  /**
   * Es el valor total del pedido
   */
  total: number;

  /**
   * Es el número que indica el estado del carrito para saber si se ha comprado los pedidos o no
   */
  estadocar: number;

  /**
   * Es el número indicador del pedido
   */
  id_pedido: number;

  /**
   * Es el nombre del producto del pedido
   */
  nom_producto: string;

  /**
   * Es la cantidad de productos a comprar
   */
  cant_Actual: number;

  /**
   * Indica quién realizó el último cambio del carrito
   */
  session: string;

  /**
   * Indica la última vez que se le hizo un cambio al carrito
   */
  last_modify: Date;

}
