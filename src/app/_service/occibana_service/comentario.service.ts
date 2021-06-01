import { Calificacion } from './../../_model/occibana_model/Calificacion';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Decorador de Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  /**
   * Enlace para llamar a los servicios de Occibana
   */
  private URL: string;

  /**
   * Constructor sobre cargado del servicio de PanelHotelService
   * @param http 
   */
  constructor(private http: HttpClient) {
    this.URL = environment.OCCIBANA + '/comentarCalificar';
  }

  /**
   * Método que crea un comentario a un hotel
   * @param idUsuario 
   * @param comentario 
   * @param idHotel 
   * @returns 
   */
  postComentar(idUsuario: number, comentario: string, idHotel: number) {
    return this.http.post(this.URL + '/postComentar', {
      "IdSession": idUsuario,
      "Comentario": comentario,
      "IdHotelSession": idHotel
    });
  }

  /**
   * Método que crea una calificación a un hotel
   * @param calificacion 
   * @returns 
   */
  postCalificar(idUsuario: number, idReserva: number, idHotel: number, calificacion: number) {
    return this.http.post<Calificacion>(this.URL + '/postCalificar', {
      "IdSession": idUsuario,
      "IdReserva": idReserva,
      "IdHotelSession": idHotel,
      "Calificacion": calificacion
    });
  }
}
