import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pedido } from 'src/app/_model/superfast_model/Pedido';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { ComunicacionService } from 'src/app/_service/superfast_service/comunicacion.service';
import { environment } from 'src/environments/environment';
import { PedidosClienteService } from 'src/app/_service/superfast_service/pedidos-cliente.service';
import { CarritoService } from 'src/app/_service/superfast_service/carrito.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DetallePedido } from 'src/app/_model/superfast_model/DetallePedido';
import { MatTabChangeEvent } from '@angular/material/tabs';

/**
 * Decorador de SuperfastCarritoComponent
 */
@Component({
  selector: 'app-superfast-carrito',
  templateUrl: './superfast-carrito.component.html',
  styleUrls: ['./superfast-carrito.component.css']
})

/**
 * Clase que maneja la lógica del carrito
 */
export class SuperfastCarritoComponent implements OnInit {

  /**
   * Constructor de SuperfastCarritoComponent
   * @param comunicacionService objeto que permite usar los servicios de catálogo, carrito y pedidos
   * @param pedidosClienteService objeto que permite usar los servicios para los pedidos
   * @param _snackBar objeto que permite mostrar mensajes que den información al usuario
   * @param carritoService objeto que permite usar los servicios del carrito
   * @param usuarioTransversalService objeto que permite usar los servicios del usuario en general
   * @param router objeto que permite redireccionar
   */
  constructor(private comunicacionService: ComunicacionService,
    private pedidosClienteService: PedidosClienteService,
    private _snackBar: MatSnackBar,
    private carritoService: CarritoService,
    private usuarioTransversalService: UsuarioTransversalService,
    private router: Router) { }

  /**
   * Arreglo que almacena los pedidos del carrito
   */
  pedidos: Pedido[];



  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {

    const HELPER = new JwtHelperService();
    let tokenSuperfast = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_SUPERFAST));

    let usuarioSuperfast = new UsuarioSuperfast();
    usuarioSuperfast.id = tokenSuperfast.nameid;

    this.comunicacionService.getPedido(usuarioSuperfast).subscribe(data => {

      this.pedidos = data;

      for (var i = 0; i < this.pedidos.length; i++) {

        for (var j = 0; j < this.pedidos[i].compras.length; j++) {

          var longitud = this.pedidos[i].compras[j].imagen_producto1.length;
          this.pedidos[i].compras[j].imagen_producto1 = "http://52.67.179.68:8081/" + this.pedidos[i].compras[j].imagen_producto1.substring(1, longitud);

        }

      }

    })

  }

  /**
   * Permite cancelar el pedido
   * @param idPedido indica el pedido a cancelar
   */
  cancelarPedido(idPedido: number) {

    this.pedidosClienteService.cancelarPedido(idPedido).subscribe(data => {

      this._snackBar.open('El pedido ha sido cancelado exitosamente', 'Cancel  ', {
        duration: 5000
      });

      this.ngOnInit();

    })

  }

  /**
   * Permite retirar todos los pedidos del carrito
   */
  limpiarCarrito() {

    this.pedidos.forEach(element => {

      this.cancelarPedido(element.id_pedido);

    });

  }

  /**
   * Permite efectuar la compra de los pedidos del carrito
   */
  comprarCarrito() {

    const HELPER = new JwtHelperService();

    let usuarioSuperfast = new UsuarioSuperfast();

    let tokenGeneral = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN));
    let tokenSuperfast = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_SUPERFAST));

    usuarioSuperfast.id = tokenSuperfast.nameid;

    let usuarioIncompleto = new Usuario();
    usuarioIncompleto.correo = tokenGeneral.email;
    usuarioIncompleto.usuario = tokenGeneral.name;

    this.usuarioTransversalService.getUsuario(usuarioIncompleto).subscribe(data => {

      usuarioSuperfast.telefono = data.celular;
      usuarioSuperfast.direccion = data.direccion;

      this.carritoService.comprarCarrito(usuarioSuperfast).subscribe(data => {

        this._snackBar.open('Ha comprado los productos del carrito', 'Cancel  ', {
          duration: 3000
        });

        this.carritoService.setPedidosFactura(this.pedidos);

        this.router.navigate(['/superfast/facturas']);

      });

    })

  }

}
