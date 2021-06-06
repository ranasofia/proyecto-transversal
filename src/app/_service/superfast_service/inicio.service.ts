import { Injectable } from '@angular/core';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { Producto } from 'src/app/_model/superfast_model/Producto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

/**
 * Decorador de InicioService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que llama el servicio de agregar al carrito
 */
export class InicioService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.SUPERFAST +  '/Inicio';

  /**
    * Da estado inicial e inyecta variables en InicioService
    * @param http variable que se inyecta para poder hacer las peticiones http
    */
  constructor(private http: HttpClient) { }

  /**
   * Permite agregar un pedido al carrito
   * @param usuario objeto que posee el usuario para agregarle productos a su carrito
   * @param producto objeto que posee los datos del producto que se agregará al carrito
   * @param especificacion variable que posee los datos adicionales del pedido por parte del cliente
   * @returns mensaje
   */
  agregarAlCarrito(usuario: UsuarioSuperfast, producto: Producto, especificacion: string){

    let cuerpoSolicitud = {idcliente: usuario.id,
    idaliado: producto.id_aliado,
    descripcion: especificacion,
    valorunitario: producto.precio_producto,
    productoid: producto.id,
    direccioncliente: usuario.direccion,
    telefonocliente: usuario.telefono,
    cantidad: producto.cantidad};

    return this.http.post<string>(this.URL + "/AgregarPedidosCarrito", cuerpoSolicitud);

  }

}
