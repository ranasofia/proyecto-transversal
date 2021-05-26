import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioOccibana } from 'src/app/_model/occibana_model/UsuarioOccibana';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private URL: string = environment.OCCIBANA +  '/perfil';

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

}
