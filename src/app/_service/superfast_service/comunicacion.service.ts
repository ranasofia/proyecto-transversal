import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from '../../_model/superfast_model/Producto';

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

    return this.http.get<Producto[]>(this.URL + "/GetMostrarProductoInicio");

  }

}
