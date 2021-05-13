import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductoH } from 'src/app/_model/hccauchos_model/ProductoH';
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

}

