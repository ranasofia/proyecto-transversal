import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.HCCAUCHOS +  '/login';

  /**
   * Da estado inicial e inyecta variables en ClienteService
   * @param http variable que se inyecta para poder hacer las peticiones http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Permite obtener el token JWT que se utilizará para las futuras peticiones de servicio
   * @param usuario variable que tiene los datos de autenticación del usuario para poder obtener el token
   * @returns token
   */
  getToken(usuario: UsuarioHCCauchos) {

    return this.http.post<string>(this.URL + "/login", usuario, {
      headers: {

        'Content-Type': 'application/json'

      }

    });
  }

}
