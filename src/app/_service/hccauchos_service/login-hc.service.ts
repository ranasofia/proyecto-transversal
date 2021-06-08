import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioHCCauchos } from 'src/app/_model/hccauchos_model/UsuarioHCCauchos';

/**
 * Decorador de LoginHCService
 */
@Injectable({
  providedIn: 'root'
})
/**
 * Clase que llama los servicios relacionados con el inicio de sesión de HCCauchos
 */
export class LoginHCService {

  /**
   * Posee el enlace para llamar a los servicios login y cerrar sesión
   */
  private URL: string = environment.HCCAUCHOS +  '/login';
  /**
   * Posee el enlace para llamar a los servicios de generar token para recuperar contraseña
   */
  private URL2: string = environment.HCCAUCHOS + '/Recuperar';
  /**
   * Posee el enlace para llamar al servicio de cambia la contraseña para recuperar contraseña
   */
  private URL3: string = environment.HCCAUCHOS + '/Usuario';

  /**
   * Da estado inicial e inyecta variables en ClienteService
   * @param http variable que se inyecta para poder hacer las peticiones http
   */
  constructor(private http: HttpClient, private httpBackend: HttpBackend) {
  }

  /**
   * Permite obtener el token JWT que se utilizará para las futuras peticiones de servicio
   * @param usuario variable que tiene los datos de autenticación del usuario para poder obtener el token
   * @returns token
   */
  getToken(usuario: UsuarioHCCauchos) {

    let httpToken:HttpClient = new HttpClient(this.httpBackend);
    return httpToken.post<string>(this.URL + "/login", usuario);
  }

  /**
   * Permite cerrar la sesión del usuario realizando las modificaciones de auditoria en la base de datos
   * @param usuario variable que indica cuál usuario fue el que cerró sesión
   * @returns mensaje
   */
  putCerrarSesion(usuario: UsuarioHCCauchos){

    return this.http.put(this.URL + "/cerrarcesion", usuario);
  }

  /**
   * Permite generar el token para recuperar la contraseña
   * @param usuario variable que obtiene los parametros para la recuperación
   * @returns 
   */
  postGenerarContraseña(usuario: any){
    return this.http.post(this.URL2 + "/recuperar", usuario);
  }

  /**
   * Permite cambiar la contraseña
   * @param usuario variable que contiene los datos cambiar la contraseña
   * @returns 
   */
  putRecuperarContraseña(usuario: any){
    return this.http.put(this.URL3 + '/actualizarclave', usuario);
  }
}
