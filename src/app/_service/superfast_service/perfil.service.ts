import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioSuperfast } from './../../_model/superfast_model/UsuarioSuperfast';

/**
 * Decorador de PerfilService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que llama el servicio para actualizar los datos de perfil del usuario
 */
export class PerfilService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.SUPERFAST +  '/Perfil';

  /**
    * Da estado inicial e inyecta variables en PedidosClienteService
    * @param http variable que se inyecta para poder hacer las peticiones http
    */
  constructor(private http: HttpClient) {
  }

  /**
   * Permite actualizar los datos del usuario
   * @param usuario objeto que posee los datos del usuario para actualizar su información
   * @returns mensaje
   */
  actualizarPerfil(usuario: UsuarioSuperfast){
    return this.http.post(this.URL + "/PostBTN_guardar", usuario);
  }

}
