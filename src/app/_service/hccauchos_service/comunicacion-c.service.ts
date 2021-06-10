import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductoH } from 'src/app/_model/hccauchos_model/ProductoH';
import { UsuarioHCCauchos } from 'src/app/_model/hccauchos_model/UsuarioHCCauchos';
import { Carro } from 'src/app/_model/hccauchos_model/Carro';
import { Pedido } from 'src/app/_model/hccauchos_model/Pedido';
import { Destino } from 'src/app/_model/hccauchos_model/Destino';

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
   * Almacena los pedidos que se usarán para generar la factura
   */
   private pedidosFactura: Pedido[];

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

  /**
   * Permite agregar existencias al carrito
   * @param carro objeto que posee los datos del artículo a agregar al carrito
   * @returns mensaje
   */
  agregarAlCarrito(carro: Carro){

    return this.http.post<string>(this.URL + "/AgregarAlCarrito", carro);

  }

  /**
   * Permite obtener los artículos en el carrito de un usuario en específico
   * @param idUsuario variable que indica el usuario del cual se desea obtener el carrito
   * @returns carrito
   */
  getCarrito(idUsuario: number){

    return this.http.get<Pedido[]>(this.URL + "/ObtenerCarrito/" + idUsuario);

  }

  /**
   * Permite eliminar un pedido en específico del carrito
   * @param idPedido variable que indica el pedido que se eliminará del carrito
   * @returns mensaje
   */
  eliminarPedidoCarrito(idPedido: number){

    return this.http.get<string>(this.URL + "/EliminarItemCarrito?id_carrito=" + idPedido);

  }

  /**
   * Permite eliminar todos los pedidos del carrito
   * @param idUsuario variable que indica el usuario del cual se eliminará el carrito
   * @returns mensaje
   */
  eliminarCarrito(idUsuario: number){

    return this.http.get<string>(this.URL + "/EliminarCarrito?user_id=" + idUsuario);

  }

  getDestinos(){

    return this.http.get<Destino[]>(this.URL + "/Lugares");

  }

  setPedidosFactura(pedidos: Pedido[]){

    this.pedidosFactura = pedidos;

  }

  getPedidosFactura(){

    return this.pedidosFactura;

  }

  getHistorial(){

    return this.http.get<Object[]>(this.URL + "/historial");

  }

  comprarCarrito(idDestino: number, direccion: string){

    let cuerpoPeticion = {municipio: idDestino, direccion: direccion};

    return this.http.post<string>(this.URL + "/finalizarcompra", cuerpoPeticion);

  }

}

