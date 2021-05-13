import { UsuarioMototaxi } from '../_model/UsuarioMototaxi';
import { Notificacion } from './../_model/Notificacion';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Decorador de ClienteService
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Clase que llama los servicios relacionados con los clientes
 */
export class ClienteService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.UBER_MOTOS +  '/cliente';

  /**
   * Da estado inicial e inyecta variables en ClienteService
   * @param http variable que se inyecta para poder hacer las peticiones http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Permite obtener el token JWT que se utilizará para las futuras peticiones de servicio
   * @param cliente variable que tiene los datos de autenticación del cliente para poder obtener el token
   * @returns token
   */
  getToken(cliente: UsuarioMototaxi) {

    return this.http.post<string>(this.URL + "/logincliente", cliente, {
      headers: {

        'Content-Type': 'application/json'

      }

    });
  }

  /**
   * Permite obtener el historial de los viajes realizados por el usuario dada una fecha
   * @param fechaInicio variable que permite indica la fecha inicio por la cual se deben filtrar los registros
   * @param usuario variable que indica el usuario del cual se debe obtener el historial de viajes
   * @returns historial
   */
  getHistorial(fechaInicio: string, usuario: string){

    return this.http.get<Notificacion[]>(this.URL + "/historial?fechaInicio=" + fechaInicio + "&usuario=" + usuario, {
      headers: {

        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem(environment.TOKEN)

      }

    });

  }

  /**
   * Permite cerrar la sesión del usuario realizando las modificaciones de auditoria en la base de datos
   * @param usuario variable que indica cuál usuario fue el que cerró sesión
   * @returns mensaje
   */
  putCerrarSesion(usuario: string){

    return this.http.put(this.URL + "/cerrarSesion?usuario=" + usuario, null,{
      headers:{
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem(environment.TOKEN)
      }
    });
  }

  /**
   * Permite eliminar el token de la base de datos una vez la sesión ha sido cerrada
   * @param usuario variable que indica de cuál usuario debe ser eliminado el token
   * @returns mensaje
   */
  deleteEliminarToken(usuario: string){
    return this.http.delete(this.URL + "/eliminarToken?usuario=" + usuario,{
      headers:{
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem(environment.TOKEN)
      }
    })
  }

  registrar(usuario: UsuarioMototaxi){

    return this.http.post<string>(this.URL + "/registrocliente", usuario, {
      headers: {

        'Content-Type': 'application/json'

      }

    });

  }


}
