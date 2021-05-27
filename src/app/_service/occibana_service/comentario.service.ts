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

  constructor(private http: HttpClient) {
    this.URL = environment.OCCIBANA + '/comentarCalificar';
  }

  postComentar(idUsuario: number, comentario: string, idHotel: number) {
    return this.http.post(this.URL + '/postComentar', {
      "IdSession": idUsuario,
      "Comentario": comentario,
      "IdHotelSession": idHotel
    });
  }

  postCalificar(calificacion : Calificacion) {
    return this.http.post(this.URL + '/postCalificar', calificacion );
  }
}
