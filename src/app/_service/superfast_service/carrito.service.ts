import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { DetallePedido } from 'src/app/_model/superfast_model/DetallePedido';
import { Pedido } from 'src/app/_model/superfast_model/Pedido';

/**
 * Decorador de CarritoService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que llama los servicios para ejecutar la compra en el carrito y realizar la factura
 */
export class CarritoService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.SUPERFAST +  '/Carrito';

  /**
   * Almacena los pedidos que se usarán para generar la factura
   */
  private pedidosFactura: Pedido[];

  /**
   * Da estado inicial e inyecta variables en ClienteService
   * @param http variable que se inyecta para poder hacer las peticiones http
   */
  constructor(private http: HttpClient) { }

  /**
   * Permite comprar los pedidos del carrito
   * @param usuario objeto que posee los datos necesarios del usuario para comprar los pedidos del carrito
   * @returns
   */
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

  /**
   * Permite indicar los pedidos que se usarán para generar la factura
   * @param pedidos arreglo que posee los pedidos para generar la factura
   */
  setPedidosFactura(pedidos: Pedido[]){

    this.pedidosFactura = pedidos;

  }

  /**
   * Permite obtener los pedidos para generar la factura
   * @returns pedidos
   */
  getPedidosFactura(){

    return this.pedidosFactura;

  }

}
