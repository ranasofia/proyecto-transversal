import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductoH } from 'src/app/_model/hccauchos_model/ProductoH';
import { UsuarioHCCauchos } from 'src/app/_model/hccauchos_model/UsuarioHCCauchos';
import { Carro } from 'src/app/_model/hccauchos_model/Carro';
import { Pedido } from 'src/app/_model/hccauchos_model/Pedido';

/**
 * Decorador de ComunicacionCService
 */
@Injectable({
  providedIn: 'root'
})
export class ComunicacionCService {
  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.HCCAUCHOS+ '/Usuario';

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
  getCatalogo() {

    return this.http.get<ProductoH[]>(this.URL + "/catalogo");

  }

  /**
   * Permite cambiar el correo del usuario
   * @param usuario objeto que posee los datos actualizados del usuario
   * @returns mensaje
   */
  cambiarCorreo(usuario: UsuarioHCCauchos){

    return this.http.put<string>(this.URL + "/editarcorreo", usuario);

  }

  /**
   * Permite cambiar la clave del usuario
   * @param usuario objeto que posee los datos actualizados del usuario
   * @returns mensaje
   */
  cambiarClave(usuario: UsuarioHCCauchos){

    return this.http.put<string>(this.URL + "/modificarclave", usuario);

  }

  agregarAlCarrito(carro: Carro){

    return this.http.post<string>(this.URL + "/AgregarAlCarrito", carro);

  }

  getCarrito(idUsuario: number){

    return this.http.get<Pedido[]>(this.URL + "/ObtenerCarrito/" + idUsuario);

  }

  eliminarPedidoCarrito(idPedido: number){

    return this.http.get<string>(this.URL + "/EliminarItemCarrito?id_carrito=" + idPedido);

  }

  eliminarCarrito(idUsuario: number){

    return this.http.get<string>(this.URL + "/EliminarCarrito?user_id=" + idUsuario);

  }

}

