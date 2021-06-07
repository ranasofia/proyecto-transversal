import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioOccibana } from 'src/app/_model/occibana_model/UsuarioOccibana';

/**
 * Decorador de Injectable
 */
@Injectable({
  providedIn: 'root',
})

/**
 * Clase que llama el servicio para actualizar los datos de perfil del usuario de la aplicación Occibana
 */
export class PerfilService {
  /**
   * Enlace para llamar a los servicios de Occibana
   */
  private URL: string = environment.OCCIBANA + '/perfil';

  /**
   * Enlace para llamar a los servicios de Occibana
   */
  private URL2: string = environment.OCCIBANA + '/admin';

  /**
   * Constructor sobrecargado del servicio PerfilService
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Permite actualizar los datos del usuario
   * @param usuario objeto que posee los datos del usuario para actualizar su información
   * @returns mensaje
   */
  actualizarPerfil(usuario: Object) {
    return this.http.post(this.URL + '/postActualizarDatos', usuario);
  }

  /**
   * Permite actualizar la contraseña del usuario
   * @param usuario objeto que posee los datos del usuario para actualizar su contraseña
   * @returns mensaje
   */
  cambiarClave(usuario: Object) {
    return this.http.put(this.URL + '/putActualizarContrasena', usuario);
  }

  /**
   * Permite cargar todos los datos respectivos del usuario
   * @param usuario objeto que posee los datos del usuario para posteriormente ser cargados
   * @returns mensaje
   */
  cargarDatos(usuario: UsuarioOccibana) {
    return this.http.post(this.URL + '/postCargarDatosPerfil', usuario);
  }

  /**
   * Permite generar el token para recuperación de contraseña
   * @param usuario variable recibe el usuario y correo del usuario para recuperar
   * @returns mensaje
   */
  postGenerarContraseña(usuario: any) {
    return this.http.post(
      this.URL2 + '/postCorreoRecuperacionTransversal',
      usuario
    );
  }

  /**
   * Permite cambiar la contraseña
   * @param usuario variable que contiene los datos para realizar la recuperación
   * @returns mensaje
   */
  putRecuperarContraseña(usuario: any) {
    return this.http.put(this.URL2 + '/putReactivarCuenta', usuario);
  }
}
