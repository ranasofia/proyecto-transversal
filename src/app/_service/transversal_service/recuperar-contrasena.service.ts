import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenRecuperacion } from 'src/app/_model/transversal_model/TokenRecuperacion';

/**
 * Decorador de RecuperarContrasenaService
 */
@Injectable({
  providedIn: 'root'
})


/**
 * Clase que llama los servicios relacionados con la recuperacion de contraseña
 */
export class RecuperarContrasenaService {

   /**
   * Posee el enlace para llamar a los servicios
   */
    private URL: string = environment.UBER_MOTOS +  '/usuario';

    /**
   * Da estado inicial e inyecta variables en ClienteService
   * @param http variable que se inyecta para poder hacer las peticiones http
   */
  constructor(private http: HttpClient) { }

  /**
   * Permite generar el token para recuperación de contraseña
   * @param usuario variable que se utiliza para obtener el correo para la recuperacion
   * @returns
   */
   generar(usuario: Usuario){

    return this.http.post<string>(this.URL + "/generarContraseña", usuario);

  }

  /**
   * Permite recuperar la contraseña despues de generar el token
   * @param usuario variable que se utiliza para obtener el token generado y la nueva contraseña
   * @returns
   */
  recuperar(usuario:any){

    return this.http.put(this.URL + "/RecuperarContraseña",usuario);
  }



}
