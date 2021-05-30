import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosClienteService {

  private URL: string = environment.SUPERFAST +  '/PedidosCliente';

  constructor(private http: HttpClient) { }

  cancelarPedido(idPedido: number){

    return this.http.get<string>(this.URL + "/GetCancelarPedidoCliente?comandname=Cancelar&Id_pedido=" + idPedido);

  }

}
