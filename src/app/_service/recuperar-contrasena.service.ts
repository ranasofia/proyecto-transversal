import { Usuario } from 'src/app/_model/Usuario';


import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenRecuperacion } from '../_model/TokenRecuperacion';

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
   * Permite generar el token para recuperacion de contraseña
   * @param token variable que posee el token
   * @returns mensaje
   */
   generar(usuario: Usuario){

    return this.http.post<string>(this.URL + "/generarContraseña", usuario);

  }

  recuperar(usuario:any){

    return this.http.put(this.URL + "/RecuperarContraseña",usuario);
  }



}
