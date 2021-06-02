import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

/**
 * Decorador de PedidosClienteService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que llama el servicio de cancelar los pedidos
 */
export class PedidosClienteService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.SUPERFAST +  '/PedidosCliente';

  /**
    * Da estado inicial e inyecta variables en PedidosClienteService
    * @param http variable que se inyecta para poder hacer las peticiones http
    */
  constructor(private http: HttpClient) { }

  /**
   * Permite cancelar un pedido en específico
   * @param idPedido variable que indica el pedido que se cancelará
   * @returns mensaje
   */
  cancelarPedido(idPedido: number){

    return this.http.get<string>(this.URL + "/GetCancelarPedidoCliente?comandname=Cancelar&Id_pedido=" + idPedido);

  }

}
