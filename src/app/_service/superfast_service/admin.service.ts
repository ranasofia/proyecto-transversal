import { HttpClient } from '@angular/common/http';
import { UsuarioSuperfast } from './../../_model/superfast_model/UsuarioSuperfast';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private URL: string = environment.SUPERFAST +  '/admin';
  private URL2: string = environment.SUPERFAST + '/CerrarSession';

  constructor(private http: HttpClient) { }

  /**
   * Permite obtener el token JWT que se utilizará para las futuras peticiones de servicio
   * @param usuario variable que tiene los datos de autenticación del usuario para poder obtener el token
   * @returns token
   */
  getToken(usuario: UsuarioSuperfast) {
    return this.http.post<string>(this.URL + "/login", usuario);
  }

  /**
   * Permite cerrar la sesión del usuario realizando las modificaciones de auditoria en la base de datos
   * @param usuario variable que indica cuál usuario fue el que cerró sesión
   * @returns mensaje
   */
  postCerrarSesion(usuario: UsuarioSuperfast){
    return this.http.post(this.URL2 + "/PostPage_Load?usuario1=" + usuario, null);
  }
}
