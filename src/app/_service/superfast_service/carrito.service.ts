import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { DetallePedido } from 'src/app/_model/superfast_model/DetallePedido';
import { Pedido } from 'src/app/_model/superfast_model/Pedido';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private URL: string = environment.SUPERFAST +  '/Carrito';
  private pedidosFactura: Pedido[];

  constructor(private http: HttpClient) { }

  comprarCarrito(usuario: UsuarioSuperfast){

    let usuarioAuxiliar = {idusuario: usuario.id,
      Detpedido_id: 0,
      Telefono_cliente: usuario.telefono,
      Direccion_cliente: usuario.direccion,
      Id_pedido: 0,
      Estado_pedido: 0,
      Valor_total: 0}

    return this.http.put<string>(this.URL + "/ComprarProductosCarrito", usuarioAuxiliar);

  }

  setPedidosFactura(pedidos: Pedido[]){

    this.pedidosFactura = pedidos;

  }

  getPedidosFactura(){

    return this.pedidosFactura;

  }

}
