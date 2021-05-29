import { Reserva } from './../../_model/occibana_model/Reserva';
import { Hotel } from './../../_model/occibana_model/Hotel';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion } from '../../_model/occibana_model/Habitacion';

@Injectable({
  providedIn: 'root'
})
export class PanelHotelService {

  /**
   * Representa la URL de la API de Occibana
   */
  private URL: string;

  /**
   * Constructor sobre cargado del servicio de PanelHotelService
   * @param http 
   */
  constructor(
    private http: HttpClient
  ) {
    this.URL = environment.OCCIBANA + '/panelHotel';
  }

  /**
   * Método que obtiene la información de un hotel a partir de su id
   * @param idHotel 
   * @returns 
   */
  postInformacionHotel(idHotel: number) {
    return this.http.post<Hotel>(this.URL + "/postInformacionDelHotel", {
      "IdDelHotelSession": idHotel
    });
  }

  /**
   * Método que obtiene la informaciuón de una habitación a partir de su id
   * @param idHabitacion 
   * @returns 
   */
  postInformacionHabitacion(idHabitacion: number) {
    return this.http.post<Habitacion>(this.URL + "/postInformacionDelHabitacion", {
      "IdHabitacionSession": idHabitacion
    });
  }

  /**
   * Método que realiza una reserva a una habitación de un hotel
   * @param reserva 
   * @returns 
   */
  postReservarHospedaje(reserva: Reserva) {
    return this.http.post<string>(this.URL + '/postReservarHospedaje', reserva);
  }
  
}
