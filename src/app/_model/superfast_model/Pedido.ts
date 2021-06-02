import { DetallePedido } from 'src/app/_model/superfast_model/DetallePedido';

/**
 * Es la clase que posee los datos del pedido
 */
export class Pedido{

  /**
   * Es el número identificador del pedido
   */
  id_pedido: number;

  /**
   * Es el número identificador del cliente
   */
  cliente_id: number;

  /**
   * Es la fecha en la que se realizó el pedido
   */
  fecha: Date;

  /**
   * Es el estado del pedido, para saber si la compra está en proceso
   */
  estado_id: number;

  /**
   * Es el costo total del pedido
   */
  valor_total: number;

  /**
   * Es el número identificador del domiciliario
   */
  domiciliario_id: number;

  /**
   * Es el comentario del cliente hacia el pedido
   */
  comentario_cliente: string;

  /**
   * Es el comentario del aliado hacia el pedido
   */
  comentario_aliado: string;

  /**
   * Es el número identificador del aliado
   */
  aliado_id: number;

  /**
   * Es el estado del pedido
   */
  estado_pedido: number;

  /**
   * Es el número identificador del domicilio
   */
  estado_domicilio_id: number;

  /**
   * Son las compras de artículos del pedido
   */
  compras: DetallePedido[];

  /**
   *
   */
  compras1: DetallePedido[];

  /**
   * Es el nombre del cliente
   */
  detnombrecliente: string;

  /**
   * Es el nombre del estado del pedido
   */
  nombre_estado_ped: string;

  /**
   * Es el nombre del estado de domicilio
   */
  nombre_estado_domicilio: string;

  /**
   * Es el valor unitario de un artículo del pedido
   */
  det_valor_unitario: number;

  /**
   * Es la cantidad de artículos del pedido
   */
  det_cantidad: number;

  /**
   * Es el nombre del pedido
   */
  nombre_aliado: string;

  /**
   * Es la dirección del aliado
   */
  direccion_aliado: string;

  /**
   * Es el nombre del cliente del pedido
   */
  nombre_cliente: string;

  /**
   * Es la dirección de domicilio del cliente
   */
  direccion_cliente: string;

  /**
   * Es el teléfono celular del cliente
   */
  telefono_cliente: string;

}
