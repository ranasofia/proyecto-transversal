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
  constructor(private http: HttpClient) {
  }

  getToken(cliente: Cliente) {


    return this.http.post<string>(this.URL + "/logincliente", cliente, {
      headers: {

        'Content-Type': 'application/json'

      }

    });
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
