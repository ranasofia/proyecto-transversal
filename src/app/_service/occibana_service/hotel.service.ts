import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Hotel } from 'src/app/_model/occibana_model/Hotel';
import { HotelPrincipal } from 'src/app/_model/occibana_model/HotelPrincipal';

/**
 * Decorador de Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class HotelService {

  hotelSeleccionado: Hotel;

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
  postListadoHoteles(listaHoteles: HotelPrincipal) {
    return this.http.post<any>(this.URL + "/postHotelesPrincipal", listaHoteles);
  };

  /**
   * Método que obtiene el listado de hoteles destacados
   * @returns
   */
  getHotelesDestacados() {
    return this.http.get<Hotel[]>(this.URL + "/getHotelesDestacados");
  }

}
