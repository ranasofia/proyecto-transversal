import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pedido } from 'src/app/_model/hccauchos_model/Pedido';
import { UsuarioHCCauchos } from 'src/app/_model/hccauchos_model/UsuarioHCCauchos';
import { ComunicacionCService } from 'src/app/_service/hccauchos_service/comunicacion-c.service';
import { environment } from 'src/environments/environment';

/**
 * Decorador de HccauchosCarritoComponent
 */
@Component({
  selector: 'app-hccauchos-carrito',
  templateUrl: './hccauchos-carrito.component.html',
  styleUrls: ['./hccauchos-carrito.component.css']
})

/**
 * Clase que mabneja la lógica del carrito
 */
export class HccauchosCarritoComponent implements OnInit {

  /**
   * Constructor de HccauchosCarritoComponent
   * @param comunicacionCService objeto que se inyecta para poder usar los servicios del carrito
   * @param _snackBar objeto que se inyecta para mostrar mensajes que comuniquen información al usuario
   */
  constructor(private comunicacionCService: ComunicacionCService,
    private _snackBar: MatSnackBar) { }

  /**
   * Son los pedidos del carrito
   */
  pedidos: Pedido[];

  pedidosPaginados: Pedido[];

  dataSource: MatTableDataSource<Pedido>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {

    const HELPER = new JwtHelperService();
    let tokenHCCauchos = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_HCCAUCHOS));

    let idUsuario = tokenHCCauchos.nameid;

    this.comunicacionCService.getCarrito(idUsuario).subscribe(data => {

      this.pedidos = data;
      this.pedidosPaginados = data;

      this.dataSource = new MatTableDataSource(this.pedidos);
      this.dataSource.paginator = this.paginator;

      this.actualizarPaginador();

    })

  }

  /**
   * Permite cancelar un pedido
   * @param idPedido indica el pedido a cancelar
   */
  cancelarPedido(idPedido: number){

    this.comunicacionCService.eliminarPedidoCarrito(idPedido).subscribe(data => {

      this._snackBar.open('Producto eliminado correctamente del carrito', 'Cancel  ', {
        duration: 5000
      });

      this.ngOnInit();

    })

  }

  /**
   * Permite limpiar todo el carrito
   */
  vaciarCarrito(){

    const HELPER = new JwtHelperService();
    let tokenHCCauchos = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_HCCAUCHOS));

    let idUsuario = tokenHCCauchos.nameid;

    this.comunicacionCService.eliminarCarrito(idUsuario).subscribe(data => {

      this._snackBar.open('Se ha limpiado el carrito', 'Cancel  ', {
        duration: 5000
      });

      this.ngOnInit();

    })

  }

  actualizarPaginador() {

    if (this.paginator != undefined) {

      let indiceInicial = (this.paginator.pageIndex + 1) * this.paginator.pageSize - this.paginator.pageSize;
      let indiceFinal = (this.paginator.pageIndex + 1) * this.paginator.pageSize - 1;

      this.pedidosPaginados = this.dataSource.filteredData.slice(indiceInicial, indiceFinal + 1);
    }

  }

}
