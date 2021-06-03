import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioOccibana } from 'src/app/_model/occibana_model/UsuarioOccibana';

/**
 * Decorador de RegistroLoginOccibanaService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que llama los servicios relacionados con el registro e inicio de sesión de Occibana
 */
export class RegistroLoginOccibanaService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.OCCIBANA +  '/registroLogin';
  private URL2: string = environment.OCCIBANA +  '/perfil';

  /**
   * Da estado inicial e inyecta variables en ClienteService
   * @param http variable que se inyecta para poder hacer las peticiones http
   */
  constructor(private http: HttpClient, private httpBackend: HttpBackend) { }

  /**
   * Permite registrar a un usuario en la aplicación de HCCauchos
   * @param usuario variable que posee al usuario con los datos a registrar
   * @returns mensaje
   */
  registrar(usuario: UsuarioOccibana){

    return this.http.post<string>(this.URL + "/postRegistroUsuario", usuario);

  }

  /**
   * Permite obtener el token JWT que se utilizará para las futuras peticiones de servicio
   * @param usuario variable que tiene los datos de autenticación del usuario para poder obtener el token
   * @returns token
   */
  getToken(usuario: UsuarioOccibana) {

    let httpToken:HttpClient = new HttpClient(this.httpBackend);
    return httpToken.post<string>(this.URL + "/postIngresoLogin", usuario);
  }

  /**
   * Permite cerrar la sesión del usuario realizando las modificaciones de auditoria en la base de datos
   * @param usuario variable que indica cuál usuario fue el que cerró sesión
   * @returns mensaje
   */
  postCerrarSesion(usuario: UsuarioOccibana){
    return this.http.post<string>(this.URL2 + "/postCerrarSesion", usuario);
  }

}
