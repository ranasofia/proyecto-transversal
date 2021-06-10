import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';

/**
 * Decorador de RegistroSFService
 */
@Injectable({
  providedIn: 'root'
})
export class RegistroSFService {

  /**
   * Posee el enlace para llamar a los servicios
   */
   private URL: string = environment.SUPERFAST +  '/Registrar';

   /**
    * Da estado inicial e inyecta variables en ClienteService
    * @param http variable que se inyecta para poder hacer las peticiones http
    */
   constructor(private http: HttpClient) { }

   /**
    * Permite registrar a un usuario en la aplicación de HCCauchos
    * @param usuario variable que posee al usuario con los datos a registrar
    * @returns mensaje
    */
   registrar(usuario: UsuarioSuperfast){

     return this.http.post<string>(this.URL + "/PostInsertar_Usuario", usuario);

   }

   verificarCorreo(correo: string){

    return this.http.get<string>(this.URL + "/GetVerificar_correo?correo=" + correo);

   }

}
