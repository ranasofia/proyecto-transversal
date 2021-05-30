import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pedido } from 'src/app/_model/superfast_model/Pedido';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { ComunicacionService } from 'src/app/_service/superfast_service/comunicacion.service';
import { environment } from 'src/environments/environment';
import { PedidosClienteService} from 'src/app/_service/superfast_service/pedidos-cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-superfast-carrito',
  templateUrl: './superfast-carrito.component.html',
  styleUrls: ['./superfast-carrito.component.css']
})
export class SuperfastCarritoComponent implements OnInit {

  constructor(private comunicacionService: ComunicacionService,
    private pedidosClienteService: PedidosClienteService,
    private _snackBar: MatSnackBar) { }

  pedidos: Pedido[];

  ngOnInit(): void {

    const HELPER = new JwtHelperService();
    let tokenSuperfast = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_SUPERFAST));

    let usuarioSuperfast = new UsuarioSuperfast();
    usuarioSuperfast.id = tokenSuperfast.nameid;

    this.comunicacionService.getPedido(usuarioSuperfast).subscribe(data => {

      this.pedidos = data;

      for (var i = 0; i < this.pedidos.length; i++) {

        var longitud = this.pedidos[i].compras[0].imagen_producto1.length;
        this.pedidos[i].compras[0].imagen_producto1 = "https://www.superfastisw.tk/" + this.pedidos[i].compras[0].imagen_producto1.substring(1, longitud);

      }

    })

  }

  cancelarPedido(idPedido: number){

    this.pedidosClienteService.cancelarPedido(idPedido).subscribe(data => {

      this._snackBar.open('El pedido ha sido cancelado exitosamente', 'Cancel  ', {
        duration: 5000
      });

      this.ngOnInit();

    })

  }


}
