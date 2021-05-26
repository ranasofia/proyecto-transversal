import { DatosUsuario } from './../../_model/occibana_model/DatosUsuario';
import { UsuarioOccibana } from './../../_model/occibana_model/UsuarioOccibana';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosPerfilService {

  /**
   * Enlace para llamar a los servicios de Occibana
   */
  private URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.URL = environment.OCCIBANA + '/perfil';
  }

  postCargaDatosPerfil(usuarioOccibana: string) {
    return this.http.post<DatosUsuario>(this.URL + '/postCargarDatosPerfil', {
      "usuario": usuarioOccibana
    });
  }
}
