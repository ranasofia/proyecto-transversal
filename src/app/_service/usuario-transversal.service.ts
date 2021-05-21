import { Usuario } from './../_model/Usuario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


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

   /**
    * permite obtener los registros del los usuarios
    * @returns 
    */
   getMostrarRegistros(){
     return this.http.get<Usuario[]>(this.URL+"/registros");
   }

   /**
    * Permite obtener el registro del usuario 
    * @param idUsuario variable que permite traer los datos de un usuario
    * @returns 
    */
   getMostrarUsuario(idUsuario:number){
     return this.http.get(this.URL+"/mostrarDatos?idUsuario="+idUsuario);
   }

   /**
    * Permite modificar los registros del usuario
    * @param idUsuario variabe que especifica el usuario a modificar 
    * @returns 
    */
   putModificarRegistro(idUsuario:number){
     return this.http.put(this.URL+"/actualizarPerfil?idUsuario="+idUsuario,null);
   }

   /**
    * Permite eliminar un registro usuario (cambia a estado inactivo)
    * @param idUsuario variable que especifica el usuario a eliminar 
    * @returns 
    */
   putEliminarRegistro(idUsuario:number){
    return this.http.put(this.URL+"/eliminar?idUsuario="+idUsuario,null);
   }

}
