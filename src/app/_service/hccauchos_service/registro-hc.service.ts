import { UsuarioHCCauchos } from 'src/app/_model/hccauchos_model/UsuarioHCCauchos';
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Decorador de RegistroHCService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que llama los servicios relacionados con el registro de HCCauchos
 */
export class RegistroHCService {

  /**
   * Posee el enlace para llamar a los servicios
   */
  private URL: string = environment.HCCAUCHOS +  '/Registro';

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
  registrar(usuario: UsuarioHCCauchos){

    return this.http.post<string>(this.URL + "/Registro", usuario);

  }

  /**
   * Permite verificar si un correo ya existe en el sistema
   * @param usuario objeto que posee el correo del usuario
   * @returns mensaje
   */
  verificarCorreo(usuario: UsuarioHCCauchos){

    let httpVerificar:HttpClient = new HttpClient(this.httpBackend);
    return httpVerificar.post<string>(this.URL + "/verificarCorreo", usuario);

  }

}
