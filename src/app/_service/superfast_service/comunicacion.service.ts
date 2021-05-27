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
export class ComunicacionService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.SUPERFAST +  '/comunicacion';

  /**
    * Da estado inicial e inyecta variables en UsuarioTransversalService
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

  getPedido(usuario: UsuarioSuperfast){

    return this.http.post<Pedido[]>(this.URL + "/PostObtenerPedidoUsuario", usuario);

  }

}
