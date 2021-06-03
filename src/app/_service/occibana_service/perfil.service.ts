import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioOccibana } from 'src/app/_model/occibana_model/UsuarioOccibana';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private URL: string = environment.OCCIBANA +  '/perfil';
  private URL2: string =environment.OCCIBANA+ '/admin';

  constructor(private http: HttpClient) {
    
  }

  actualizarPerfil(usuario: Object){

    return this.http.post(this.URL + "/postActualizarDatos", usuario);

  }

  cambiarClave(usuario: Object){

    return this.http.post(this.URL + "/putActualizarContrasena", usuario);

  }

  cargarDatos(usuario: UsuarioOccibana){

    return this.http.post(this.URL + "/postCargarDatosPerfil", usuario);

  }

  /**
   * Permite generar el token para recuperación de contraseña
   * @param usuario variable recibe el usuario y correo del usuario para recuperar
   * @returns 
   */
  postGenerarContraseña(usuario: any){
   
    return this.http.post(this.URL2 + "/postCorreoRecuperacionTransversal",usuario);
  }

  /**
   * Permite cambiar la contraseña
   * @param usuario variable que contiene los datos para realizar la recuperación
   * @returns 
   */
  putRecuperarContraseña(usuario:any){
    return this.http.put(this.URL2 + "/putReactivarCuenta", usuario);
  }
}
