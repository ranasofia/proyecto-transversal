import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/_model/hccauchos_model/Pedido';
import { ComunicacionCService } from 'src/app/_service/hccauchos_service/comunicacion-c.service';

@Component({
  selector: 'app-historial-compras-hc',
  templateUrl: './historial-compras-hc.component.html',
  styleUrls: ['./historial-compras-hc.component.css']
})
export class HistorialComprasHCComponent implements OnInit {

  /**
   * Indica qué variables deben ser mostradas en la tabla
   */
  displayedColumns: string[] = ['nom_producto', 'cantidad', 'precio', 'total', 'fecha'];

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

  constructor(private comunicacionCService: ComunicacionCService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.comunicacionCService.getHistorial().subscribe(data =>{

      let fecha = data[data.length-1]["fecha_pedido1"];
      let pedidos = data[data.length-1]["productos"];

      pedidos.forEach(pedido => {
        pedido.precio = pedido.total/pedido.cantidad;
        pedido.fecha = fecha;
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

}
