import { Conductor } from './../../_model/mototaxi_model/Conductor';
import { Destino } from './../../_model/mototaxi_model/Destino';
import { Pago } from './../../_model/mototaxi_model/Pago';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Decorador de ClienteService
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Clase que llama los servicios relacionados con los clientes
 */
export class ServicioSolicitudService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.UBER_MOTOS +  '/cliente';

  /**
   * Da estado inicial e inyecta variables en ClienteService
   * @param http variable que se inyecta para poder hacer las peticiones http
   */
  constructor(private http: HttpClient) { }

  /**
   * Permite obtener el listado de conductores disponibles
   * @returns Conductores disponibles
   */
  getConductoresDisponibles(){
    return this.http.get<Conductor[]>(this.URL + "/conductoresDisponibles");
  }

  /**
    * Permite obtener el listado de destino 
    * @returns 
    */
  getDestino(){
    return this.http.get<Destino[]>(this.URL+"/destinos");
  }
  
  /**
   * Permite obtener el listado de Ubicacion
   * @returns 
   */
  getUbicacion(){
    return this.http.get<Destino[]>(this.URL+"/ubicaciones");
  }

  /**
   * Permite obtener lel listado de pago
   * @returns 
   */
  getPago(){
    return this.http.get<Pago[]>(this.URL+"/metodoPago");
  }

  /**
   * Permite calcular la tarifa y los kilometros del servicios 
   * @param tarifa Obtiene el destino y la ubicacion
   * @returns 
   */
  postCalcular(tarifa:any){
    return this.http.post(this.URL+"/tarifas",tarifa);
  }

  /**
   * Permite solicitar un servicio
   * @param notificacion Objeto que contiene todos los atributos de notificacion
   * @returns 
   */
  postSolicitarServicio(notificacion: any){
    return this.http.post(this.URL + "/solicitudServicio", notificacion);
  }
}
