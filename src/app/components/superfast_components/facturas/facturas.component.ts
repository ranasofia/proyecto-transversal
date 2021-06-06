import { DetallePedido } from './../../../_model/superfast_model/DetallePedido';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperfastCarritoComponent } from 'src/app/components/superfast_components/superfast-carrito/superfast-carrito.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import { CarritoService } from 'src/app/_service/superfast_service/carrito.service';
import { Pedido } from 'src/app/_model/superfast_model/Pedido';

/**
 * Decorador de FacturasComponent
 */
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})

/**
 * Clase que maneja la lógica de la factura al comprar productos
 */
export class FacturasComponent implements OnInit {


  /**
  * Indica las columnas a mostrar en la tabla de los datos recibidos
  */
  displayedColumns: string[] = ['nombreprodet', 'v_unitario', 'cantidad', 'v_total'];

  /**
   * Indica el origen de los datos para llenar la tabla
   */
  dataSource = new MatTableDataSource<DetallePedido>();

  /**
   * Indica el total a pagar
   */
  total = 0;

  /**
   * Permite ordenar los datos de la tabla
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Constructor de FacturasComponent
   * @param carritoService objeto que se inyecta para usar los servicios de carrito
   * @param router objeto que se inyecta para redireccionar
   */
  constructor(private carritoService: CarritoService,
    private router: Router) { }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {

    let pedidos: Pedido[] = this.carritoService.getPedidosFactura();
    let articulos: DetallePedido[] = [];

    if (pedidos == undefined) {

      this.router.navigate(["/superfast/catalogo"]);

    } else {

      pedidos.forEach(pedido => {

        pedido.compras.forEach(articulo => {

          this.total = this.total + articulo.v_total;
          articulos.push(articulo);

        });

      });

    }

    this.dataSource = new MatTableDataSource(articulos);
    this.dataSource.sort = this.sort;

  }

  /**
   * Permite filtrar los datos que se muestran en la tabla
   * @param filter variable que indica la palabra para filtrar
   */
  dataFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }

  /**
   * Genera la factura para que el usuario la pueda descargar
   */
  export() {

    const options = {
      filename: "Factura.pdf",
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape', }
    };
    const content: Element = document.getElementById('content');
    html2pdf().from(content).set(options).save();

    this.router.navigate(["/superfast/catalogo"]);

  }
}
