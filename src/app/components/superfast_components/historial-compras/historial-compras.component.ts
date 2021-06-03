import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DetallePedido } from 'src/app/_model/superfast_model/DetallePedido';
import { Pedido } from 'src/app/_model/superfast_model/Pedido';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { ComunicacionService } from 'src/app/_service/superfast_service/comunicacion.service';
import { environment } from 'src/environments/environment';

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
  displayedColumns: string[] = ['nombreprodet', 'especprodaliado', 'imagen_producto1', 'cantidad', 'descripcion', 'v_unitario', 'v_total'];

  /**
   * Es el origen de datos de la tabla
   */
  dataSource = new MatTableDataSource<DetallePedido>();

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
  constructor(private comunicacionService: ComunicacionService) { }

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
      let detalles: Array<DetallePedido> = [];

      pedidos.forEach(element => {

        var longitud = element.compras[0].imagen_producto1.length;
        element.compras[0].imagen_producto1 = "https://www.superfastisw.tk/" + element.compras[0].imagen_producto1.substring(1, longitud);
        detalles.push(element.compras[0]);

      });

      detalles = detalles.reverse();

      this.dataSource = new MatTableDataSource(detalles);
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

}
