import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from '../../_model/superfast_model/Producto';


@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.SUPERFAST +  '/comunicacion';

  constructor(private http: HttpClient) {


  }

  getCatalogo(){

    return this.http.get<Producto[]>(this.URL + "/GetMostrarProductoInicio");

  }

}
