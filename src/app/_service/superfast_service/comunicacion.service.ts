import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/_model/superfast_model/Producto';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { Pedido } from 'src/app/_model/superfast_model/Pedido';

/**
 * Decorador de ComunicacionService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que llama los servicios de catálogo y pedidos
 */
export class ComunicacionService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.SUPERFAST +  '/comunicacion';

  /**
    * Da estado inicial e inyecta variables en ComunicacionService
    * @param http variable que se inyecta para poder hacer las peticiones http
    */
  constructor(private http: HttpClient) {


  }

  /**
   * Permite obtener los productos del catálogo
   * @returns productos
   */
  getCatalogo(){

    return this.http.get<Producto[]>(this.URL + "/GetmostrarProductoInicio");

  }

  /**
   * Permite obtener los pedidos del carrito de un usuario en específico
   * @param usuario objeto que posee los datos del usuario para obtener sus pedidos en el carrito
   * @returns pedidos
   */
  getPedido(usuario: UsuarioSuperfast){

    return this.http.post<Pedido[]>(this.URL + "/PostObtenerPedidoUsuario", usuario);

  }

  /**
   * Permite obtener el historial de pedidos del usuario
   * @param usuario objeto que posee los datos del usuario para obtener los pedidos que ha realizado el usuario
   * @returns pedidos
   */
  getHistorialCompras(usuario: UsuarioSuperfast){

    return this.http.post<Pedido[]>(this.URL + "/PostObtenerComprasUsuario", usuario)

  }

}
