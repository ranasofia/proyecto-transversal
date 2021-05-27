import { DetallePedido } from 'src/app/_model/superfast_model/DetallePedido';

export class Pedido{

  id_pedido: number;
  cliente_id: number;
  fecha: Date;
  estado_id: number;
  valor_total: number;
  domiciliario_id: number;
  comentario_cliente: string;
  comentario_aliado: string;
  aliado_id: number;
  estado_pedido: number;
  estado_domicilio_id: number;
  compras: DetallePedido[];
  compras1: DetallePedido[];
  detnombrecliente: string;
  nombre_estado_ped: string;
  nombre_estado_domicilio: string;
  det_valor_unitario: number;
  det_cantidad: number;
  nombre_aliado: string;
  direccion_aliado: string;
  nombre_cliente: string;
  direccion_cliente: string;
  telefono_cliente: string;

}
