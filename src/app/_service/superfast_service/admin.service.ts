import { HttpClient } from '@angular/common/http';
import { UsuarioSuperfast } from './../../_model/superfast_model/UsuarioSuperfast';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private URL: string = environment.SUPERFAST +  '/admin';

  constructor(private http: HttpClient) { }

  getToken(usuario: UsuarioSuperfast) {
    return this.http.post<string>(this.URL + "/login", usuario);
  }
}
