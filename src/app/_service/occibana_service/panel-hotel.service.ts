import { Reserva } from './../../_model/occibana_model/Reserva';
import { Hotel } from './../../_model/occibana_model/Hotel';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habitacion } from '../../_model/occibana_model/Habitacion';

/**
 * Decorador de Injectable
 */
@Injectable({
  providedIn: 'root',
})

/**
 * Clase que representa el servicio del panel de los hoteles de la aplicacion Occibana
 */
export class PanelHotelService {
  /**
   * Representa la URL de la API de Occibana
   */
  private URL: string;

  /**
   * Constructor sobre cargado del servicio de PanelHotelService
   * @param http
   */
  constructor(private http: HttpClient) {
    this.URL = environment.OCCIBANA + '/panelHotel';
  }

  /**
   * Método que obtiene la información de un hotel a partir de su id
   * @param idHotel
   * @returns
   */
  postInformacionHotel(idHotel: number) {
    return this.http.post<Hotel>(this.URL + '/postInformacionDelHotel', {
      IdDelHotelSession: idHotel,
    });
  }

  /**
   * Método que obtiene la informaciuón de una habitación a partir de su id
   * @param idHabitacion
   * @returns
   */
  postInformacionHabitacion(idHabitacion: number) {
    return this.http.post<Habitacion>(
      this.URL + '/postInformacionDelHabitacion',
      {
        IdHabitacionSession: idHabitacion,
      }
    );
  }

  /**
   * Método que realiza una reserva a una habitación de un hotel
   * @param reserva
   * @returns
   */
  postReservarHospedaje(reserva: Reserva, usuario: string) {
    return this.http.post<string>(this.URL + '/postReservarHospedaje', {
      UsuarioSession: usuario,
      IdDelHotelSession: reserva.idhotel,
      Nombre: reserva.nombre,
      Apellido: reserva.apellido,
      IdHabitacion: reserva.id_habitacion,
      FechaLlegada: reserva.fecha_llegada,
      Fechasalida: reserva.fecha_salida,
      NumPersonas: reserva.numpersona,
      ModoDePago: reserva.mediopago,
      PrecioNoche: reserva.precioNoche,
    });
  }

  /**
   * Método realiza un petición par cofirmar la disponibilidad de una habitación
   * en las fechas seleccionadas por el usuario
   * @param idHotel
   * @param fechaSalida
   * @param fechaLlegada
   * @param habitacion
   * @returns
   */
  buscarDisponibilidad(
    idHotel: number,
    fechaSalida: string,
    fechaLlegada: string,
    habitacion: Habitacion
  ) {
    return this.http.post<any>(this.URL + '/postBuscarDisponibilidadHotel', {
      IdDelHotelSession: idHotel,
      FechaLlegada: fechaLlegada,
      FechaSalida: fechaSalida,
      NumeroDePersonas: habitacion.numpersonas,
      HabitacionIdSession: habitacion.id,
    });
  }
}
