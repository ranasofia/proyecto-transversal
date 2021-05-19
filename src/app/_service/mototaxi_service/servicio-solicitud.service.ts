import { Conductor } from './../../_model/mototaxi_model/Conductor';
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
}
