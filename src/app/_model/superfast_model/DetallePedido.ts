import { Pedido } from 'src/app/_model/superfast_model/Pedido';

export class DetallePedido{

  id_dpedido: number;
  pedido_id: number;
  producto_id: number;
  cantidad: number;
  descripcion: string;
  v_unitario: number;
  v_total: number;
  direccion_cliente: string;
  telefono_cliente: string;
  nombreprodet: string;
  especprodaliado: string;
  compras1: Pedido[];
  idpedido: number;
  nombre_aliado: string;
  imagen_producto1: string;

}
