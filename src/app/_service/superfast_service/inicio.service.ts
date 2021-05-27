import { Injectable } from '@angular/core';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { Producto } from 'src/app/_model/superfast_model/Producto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  private URL: string = environment.SUPERFAST +  '/Inicio';

  constructor(private http: HttpClient) { }

  agregarAlCarrito(usuario: UsuarioSuperfast, producto: Producto, especificacion: string){

    let cuerpoSolicitud = {Cliente_id: usuario.id,
    Aliado_id: producto.id_aliado,
    Descripcion: especificacion,
    V_unitario: producto.precio_producto,
    Producto_id: producto.id,
    Direccion_cliente: usuario.direccion,
    Telefono_cliente: usuario.telefono,
    Cantidad: producto.cantidad};

    return this.http.post<string>(this.URL + "/AgregarPedidoCarrito", cuerpoSolicitud);

  }

}
