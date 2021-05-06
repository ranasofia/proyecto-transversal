import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_model/Usuario';

/**
 * Decorador de UsuarioTransversalService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que llama los servicios relacionados con el registro e inicio de sesión de los usuarios en general
 */
export class UsuarioTransversalService {

  /**
   * Posee el enlace para llamar a los servicios
   */
   private URL: string = environment.UBER_MOTOS +  '/usuario';

   /**
    * Da estado inicial e inyecta variables en UsuarioTransversalService
    * @param http variable que se inyecta para poder hacer las peticiones http
    */
   constructor(private http: HttpClient) {


   }

   /**
   * Permite registrar a un usuario en la aplicación de HCCauchos
   * @param usuario variable que posee al usuario con los datos a registrar
   * @returns mensaje
   */
   registrar(usuario: Usuario){

    return this.http.post<string>(this.URL + "/registro", usuario, {
      headers: {

        'Content-Type': 'application/json'

      }

    });

   }

   /**
   * Permite obtener el token JWT que se utilizará para las futuras peticiones de servicio
   * @param usuario variable que tiene los datos de autenticación del usuario para poder obtener el token
   * @returns token
   */
   getToken(usuario: Usuario){

    return this.http.post<string>(this.URL + "/login", usuario, {
      headers: {

        'Content-Type': 'application/json'

      }

    });

   }

}
