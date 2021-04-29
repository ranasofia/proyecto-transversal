import { Cliente } from './../_model/Cliente';
import { Notificacion } from './../_model/Notificacion';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URL: string = environment.UBER_MOTOS +  '/cliente';
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

    console.log(cliente.usuario);
    console.log(cliente.contrasena);

    this.cliente = cliente;
  }

  getHistorial(fechaInicio: string, usuario: string){

    return this.http.get<Notificacion[]>(this.URL + "/historial?fechaInicio=" + fechaInicio + "&usuario=" + usuario, {
      headers: {

        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem(environment.TOKEN)

      }

    });

  }

}
