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
   * Permite registrar a un usuario en la aplicación local
   * @param usuario variable que posee al usuario con los datos a registrar
   * @returns mensaje
   */
   registrar(usuario: Usuario){

    return this.http.post<string>(this.URL + "/registro", usuario);

   }

   /**
   * Permite obtener el token JWT que se utilizará para las futuras peticiones de servicio
   * @param usuario variable que tiene los datos de autenticación del usuario para poder obtener el token
   * @returns token
   */
   getToken(usuario: Usuario){

    return this.http.post<string>(this.URL + "/login", usuario);

   }

   /**
    * Permite obtener el registro del usuario logueado
    * @param usuario variable que tiene todos los datos del usuario
    * @returns 
    */
   getUsuario(usuario: Usuario){

    return this.http.post<Usuario>(this.URL + "/mostrarPerfil", usuario);

   }

}
