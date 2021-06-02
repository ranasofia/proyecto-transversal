import { Pedido } from 'src/app/_model/superfast_model/Pedido';

/**
 * Clase que posee los detalles del pedido
 */
export class DetallePedido{

  /**
   * Es el número identificador del pedido
   */
  id_dpedido: number;

  /**
   * Es el número identificador del pedido
   */
  pedido_id: number;

  /**
   * Es el número identificador del producto
   */
  producto_id: number;

  /**
   * Es la cantidad de productos a comprar en el pedido
   */
  cantidad: number;

  /**
   * Es la descripción que el comprador establece para el pedido
   */
  descripcion: string;

  /**
   * Es el valor unitario del producto
   */
  v_unitario: number;

  /**
   * Es el valor total de la compra del pedido
   */
  v_total: number;

  /**
   * Es la dirección de domicilio del cliente
   */
  direccion_cliente: string;

  /**
   * Es el número de teléfono del cliente
   */
  telefono_cliente: string;

  /**
   * Es el nombre del producto
   */
  nombreprodet: string;

  /**
   * Es la descripción en específcio del producto
   */
  especprodaliado: string;

  /**
   *
   */
  compras1: Pedido[];

  /**
   * Es el número identificador del pedido
   */
  idpedido: number;

  /**
   * Es el nombre de la empresa aliada que ofrece el producto
   */
  nombre_aliado: string;

  /**
   * Es la imagen del producto
   */
  imagen_producto1: string;

}
