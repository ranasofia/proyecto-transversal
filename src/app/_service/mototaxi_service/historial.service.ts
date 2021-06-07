import { Notificacion } from 'src/app/_model/mototaxi_model/Notificacion';
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
   * Posee el enlace para llamar ls servicios del proyecto transversal 
   */
  private URL2: string = environment.UBER_MOTOS + '/usuario';

  
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

  /**
   * Permite realizar un comentario al conductor sobre algún servicio realizado
   * @param idNotificacion variable que especifica el id del registro
   * @param comentario variable que contiene el comentario realizado
   * @returns 
   */
  putComentar(idNotificacion:number,comentario:any){
    return this.http.put(this.URL+"/comentarServicio?idNotificacion="+idNotificacion, comentario);
  }

  /**
   * Permite traer los datos de un registro del historial
   * @param idNotificacion variable que especifica el id del registro
   * @returns datos del registro
   */
  getDatosRegistro(idNotificacion: number){
    return this.http.get(this.URL2 + "/datosRegistro?idNotificacion=" + idNotificacion);
  }

  /**
   * Permite realizar una conversacion con el conductor sobre algún servicio realizado
   * @param idNotificacion ariable que especifica el id del registro
   * @param usuario variable que indica el usuario 
   * @param conversar  variable que contiene la conversacion
   * @returns 
   */
  putConversar(idNotificacion:number,usuario:string,conversar:any){
    return this.http.put(this.URL+"/conversar?idNotificacion="+idNotificacion+"&usuario="+usuario,conversar);
  }

}
