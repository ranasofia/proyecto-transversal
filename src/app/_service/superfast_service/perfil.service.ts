import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioSuperfast } from './../../_model/superfast_model/UsuarioSuperfast';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private URL: string = environment.SUPERFAST +  '/Perfil';

  constructor(private http: HttpClient) {
  }

  actualizarPerfil(usuario: UsuarioSuperfast){
    return this.http.post(this.URL + "/PostBTN_guardar", usuario);
  }

}
