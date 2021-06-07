import { Reserva } from './../../_model/occibana_model/Reserva';
import { Habitacion } from './../../_model/occibana_model/Habitacion';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Hotel } from 'src/app/_model/occibana_model/Hotel';
import { HotelPrincipal } from 'src/app/_model/occibana_model/HotelPrincipal';
import { Comentario } from 'src/app/_model/occibana_model/Comentario';
import { UsuarioOccibana } from 'src/app/_model/occibana_model/UsuarioOccibana';

/**
 * Decorador de Injectable
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que representa el servicio de los hoteles de la aplicacion Occibana
 */
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
  postListadoHoteles(listaHoteles: HotelPrincipal) {
    return this.http.post<any>(this.URL + '/postHotelesPrincipal', listaHoteles);
  };

  /**
   * Método que obtiene el listado de hoteles destacados
   * @returns
   */
  getHotelesDestacados() {
    return this.http.get<Hotel[]>(this.URL + '/getHotelesDestacados');
  }

  /**
   * Metodo que obtiene el listado de comentarios que posee un hotel
   * @param hotel
   * @returns
   */
  postObtenerComentarios(hotel: Hotel) {
    return this.http.post<Comentario[]>(this.URL + '/postObtenerComentarios', hotel);
  }

  /**
   * Método que obtiene el listado de las habitaciones de un hotel
   * @param idHotel
   * @returns
   */
  postHabitacionesHotel(idHotel: number) {
    return this.http.post<Habitacion[]>(this.URL + '/postHabitacionesHotel', {
      "idHotel": idHotel
    });
  }

  /**
   * Método que obtiene todas las reservas que tiene el usuario
   * @param usuario
   * @returns
   */
  reservaUsuario(usuario: UsuarioOccibana) {
    return this.http.post<Reserva[]>(this.URL + '/postMostrarMisreservas', usuario);
  }

  /**
   * Método que cancela una reserva hecha por el usuario
   * @param idReserva 
   * @returns 
   */
  cancelarReserva(idReserva: number) {
    return this.http.post<any>(this.URL + '/postCancelarMireserva', {idReserva: idReserva});
  }
}
