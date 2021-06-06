import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DetallePedido } from 'src/app/_model/superfast_model/DetallePedido';
import { Pedido } from 'src/app/_model/superfast_model/Pedido';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { ComunicacionService } from 'src/app/_service/superfast_service/comunicacion.service';
import { environment } from 'src/environments/environment';
import { DialogHistorialComponent } from 'src/app/components/superfast_components/dialog-historial/dialog-historial.component'

/**
 * Decorador de HistorialcComprasComponent
 */
@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})

/**
 * Clase que maneja la lógica del historial de compras
 */
export class HistorialComprasComponent implements OnInit {

  /**
   * Indica qué variables deben ser mostradas en la tabla
   */
  displayedColumns: string[] = ['fecha', 'nombre_estado_ped', 'nombre_estado_domicilio', 'nombre_aliado', 'detalles', 'valor_total'];

  /**
   * Es el origen de datos de la tabla
   */
  dataSource = new MatTableDataSource<Pedido>();

  /**
   * Permite ordenar los datos de la tabla
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Permite paginar la tabla
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Constructor de UsuariosComponent
   * @param route objeto que permite cambiar de página
   * @param usuarioTransversalService objeto que permite usar los servicios relacionados con el usuario general
   * @param dialog objeto que permite invocar la venana modal
   */
  constructor(private comunicacionService: ComunicacionService,
    private datePipe: DatePipe,
    private dialog: MatDialog) { }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {

    let usuarioSuperfast = new UsuarioSuperfast();

    let HELPER = new JwtHelperService();
    let tokenSuperfast = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_SUPERFAST));

    usuarioSuperfast.id = tokenSuperfast.nameid;

    this.comunicacionService.getHistorialCompras(usuarioSuperfast).subscribe(data => {

      let pedidos: Pedido[] = data;

      pedidos.forEach(pedido => {


        pedido.compras.forEach(articulo =>{

          var longitud = articulo.imagen_producto1.length;
          articulo.imagen_producto1 = "https://www.superfastisw.tk/" + articulo.imagen_producto1.substring(1, longitud);

        });

      });

      this.dataSource = new MatTableDataSource(pedidos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })

  }


  /**
   * Permite filtrar los usuarios de la tabla
   * @param filter variable que indica el término de la filtración
   */
  dataFilter(filter: string) {

    this.dataSource.filter = filter.trim().toLocaleLowerCase();

  }

  openDialog(articulos) {

    //this.dialog.afterAllClosed.subscribe(data => this.ngOnInit())
    this.dialog.open(DialogHistorialComponent, {
      data: { articulos: articulos },
    });
  }

}
