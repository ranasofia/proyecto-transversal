import { Hotel } from './../../_model/occibana_model/Hotel';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion } from '../../_model/occibana_model/Habitacion';

@Injectable({
  providedIn: 'root'
})
export class PanelHotelService {

  private URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.URL = environment.OCCIBANA + '/panelHotel';
  }

  postInformacionHotel(idHotel: number) {
    return this.http.post<Hotel>(this.URL + "/postInformacionDelHotel", {
      "IdDelHotelSession": idHotel
    });
  }

  postInformacionHabitacion(idHabitacion: number) {
    return this.http.post<Habitacion>(this.URL + "/postInformacionDelHabitacion", {
      "IdHabitacionSession": idHabitacion
    });
  }
  
}
