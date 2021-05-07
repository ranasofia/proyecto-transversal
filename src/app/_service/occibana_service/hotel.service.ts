import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Hotel } from '../../_model/occibana_model/Hotel';

/**
 * Decorador de Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class HotelService {

  /**
   * Enlace para llamar a los servicios de Occibana
   */
  private URL: string;

  /**
   * Construcutor que incializa la variable URL
   * @param http 
   */
  constructor(private http: HttpClient) { 
    this.URL = environment.OCCIBANA + '/listas';
  }

  /**
   * Método que obtiene el listado de hoteles
   * @returns la lista de hoteles
   */
  postListadoHoteles() {
    return this.http.post<Hotel[]>(this.URL + "/postHotelesPrincipal", {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  /**
   * Método que obtiene el listado de hoteles destacados
   * @returns 
   */
  getHotelesDestacados() {
    return this.http.get<Hotel[]>(this.URL + "/getHotelesDestacados");
  }

}
