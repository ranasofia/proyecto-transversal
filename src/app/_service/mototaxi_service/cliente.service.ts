import { Usuario } from './../../_model/transversal_model/Usuario';
import { UsuarioMototaxi } from 'src/app/_model/mototaxi_model/UsuarioMototaxi';
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
  private URL2: string = environment.UBER_MOTOS + '/usuario';

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
    return this.http.post<string>(this.URL + "/logincliente", cliente);
  }

  /**
   * Permite cerrar la sesión del usuario realizando las modificaciones de auditoria en la base de datos
   * @param usuario variable que indica cuál usuario fue el que cerró sesión
   * @returns mensaje
   */
  putCerrarSesion(usuario: string){

    return this.http.put(this.URL + "/cerrarSesion?usuario=" + usuario, null);
  }

  /**
   * Permite eliminar el token de la base de datos una vez la sesión ha sido cerrada
   * @param usuario variable que indica de cuál usuario debe ser eliminado el token
   * @returns mensaje
   */
  deleteEliminarToken(usuario: string){
    return this.http.delete(this.URL + "/eliminarToken?usuario=" + usuario);
  }

  /**
   * Permite registrar a un usuario en la aplicación Mototaxi Delxe
   * @param usuario variable que posee al usuario con los datos a registrar
   * @returns mensaje
   */
  registrar(usuario: UsuarioMototaxi){

    return this.http.post<string>(this.URL + "/registrocliente", usuario);

  }

  /**
   * Permite cambiar los datos del usuario
   * @param nombreUsuario nombre de usuario para identificar a qué usuario se le cambia la información
   * @param usuario objeto que posee los datos actualizados del usuario
   * @returns mensaje
   */
  actualizarPerfil(nombreUsuario: string, usuario: Object){
    return this.http.put(this.URL + "/actualizarDatos?usuario=" + nombreUsuario, usuario);
  }

  /**
   * Permite traer todo el registro de un usuario
   * @param correo variable que trae los datos del usuario
   * @returns 
   */
  getDatosRecuperar(correo: string){
    return this.http.get(this.URL2 + '/datosRecuperar?correo=' + correo);
  }

  /**
   * Permite generar el token para recuperar la contraseña
   * @param usuario variable que identifica el usuario 
   * @returns 
   */
  getGenerarContraseña(usuario: string){
    return this.http.post(this.URL + "/generarContrasena", usuario);
  }

  /**
   * Permite cambiar la contraseña
   * @param token variable que permite recuperar la contraseña
   * @param contrasena variable que contien la contraseña nueva
   * @returns 
   */
  putRecuperarContraseña(token: string, contrasena:any){
    return this.http.put(this.URL + "/RecuperarContrasena?tokenRecibido=" + token, contrasena);
  }
}
