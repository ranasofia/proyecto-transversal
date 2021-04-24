import { Cliente } from './../_model/Cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URL: string = '/api/cliente';
  private cliente: Cliente;
  constructor(private http: HttpClient) {
  }


  getToken() {

    return this.http.post<string>(this.URL + "/logincliente", this.cliente, {
      headers: {

        'Content-Type': 'application/json'

      }

    });
  }
  getUsuario() {


    return this.http.get<string>(this.URL + "/usuario?usuario=" + this.cliente.usuario);

  }

  setUsuario(cliente: Cliente) {
    this.cliente = cliente;
  }

}
