import { Notificacion } from './../../_model/mototaxi_model/Notificacion';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Decorador de HistorialService
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Clase que llama a los servicios relacionados con el historial del cliente
 */
export class HistorialService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string  = environment.UBER_MOTOS + '/cliente';
  
  /**
   * Da estado inicial e inyecta variables en ClienteService
   * @param http variable que se inyecta para poder hacer las peticiones http
   */
  constructor(private http: HttpClient) { }

  /**
   * Permite obtener el historial de los viajes realizados por el usuario dada una fecha
   * @param fechaInicio variable que permite indica la fecha inicio por la cual se deben filtrar los registros
   * @param usuario variable que indica el usuario del cual se debe obtener el historial de viajes
   * @returns historial
   */
   getHistorial(fechaInicio: string, usuario: string){

    return this.http.get<Notificacion[]>(this.URL + "/historial?fechaInicio=" + fechaInicio + "&usuario=" + usuario);

  }
}
