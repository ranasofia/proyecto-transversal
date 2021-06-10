import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Destino } from 'src/app/_model/hccauchos_model/Destino';
import { Pedido } from 'src/app/_model/hccauchos_model/Pedido';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { ComunicacionCService } from 'src/app/_service/hccauchos_service/comunicacion-c.service';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';
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
   * Son los pedidos del carrito
   */
  pedidos: Pedido[];

  /**
   * Son los pedidos del carrito que deben ser mostrados de acuerdo a la paginación
   */
  pedidosPaginados: Pedido[];

  /**
   * Es la fuente de datos que controla la información que se muestra en la paginación y el filtro
   */
  dataSource: MatTableDataSource<Pedido>;

  /**
   * Objeto que permite realizar la paginación de los pedidos
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;


  /**
   * Posee los destinos disponibles para ejecutar la compra
   */
  destinos: Destino[];

  /**
   * Es el formulario de compra
   */
  compraForm: FormGroup;

  /**
   * Constructor de HccauchosCarritoComponent
   * @param comunicacionCService objeto que se inyecta para poder usar los servicios del carrito
   * @param router objeto que se inyecta para las redirecciones
   * @param _snackBar objeto que se inyecta para mostrar mensajes que comuniquen información al usuario
   * @param usuarioTransversalService objeto que se inyecta para obtener los datos completos del usuario
   */
  constructor(private comunicacionCService: ComunicacionCService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private usuarioTransversalService: UsuarioTransversalService) { }


  /**
   * Permite generar el formulario de compra con sus validaciones
   * @returns formulario
   */
  createFormGroup() {
    return new FormGroup({

      destino: new FormControl('', [
        Validators.required
      ])

    });
  }

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

    this.comunicacionCService.getDestinos().subscribe(data => {

      this.destinos = data;

    })

    this.compraForm = this.createFormGroup();

  }

  /**
   * Permite cancelar un pedido
   * @param idPedido indica el pedido a cancelar
   */
  cancelarPedido(idPedido: number) {

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
  vaciarCarrito() {

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

  /**
   * Permite actualizar la información del paginador y los datos a mostrar
   */
  actualizarPaginador() {

    if (this.paginator != undefined) {

      let indiceInicial = (this.paginator.pageIndex + 1) * this.paginator.pageSize - this.paginator.pageSize;
      let indiceFinal = (this.paginator.pageIndex + 1) * this.paginator.pageSize - 1;

      this.pedidosPaginados = this.dataSource.filteredData.slice(indiceInicial, indiceFinal + 1);
    }

  }


  /**
   * Permite comprar los productos del carrito
   */
  comprar() {

    if (this.compraForm.valid) {

      this.comunicacionCService.setPedidosFactura(this.pedidos);

      const helper = new JwtHelperService();

      let usuarioIncompleto = new Usuario();
      usuarioIncompleto.correo = helper.decodeToken(sessionStorage.getItem(environment.TOKEN)).email;
      usuarioIncompleto.usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN)).name;

      this.usuarioTransversalService.getUsuario(usuarioIncompleto).subscribe(data => {

        this.comunicacionCService.comprarCarrito(this.compraForm.controls["destino"].value, data.direccion).subscribe(data => {

          this.router.navigate(['/hccauchos/factura']);

        })

      })

    }
  }

}
