import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/_model/hccauchos_model/Pedido';
import { ComunicacionCService } from 'src/app/_service/hccauchos_service/comunicacion-c.service';
import { MatSort } from '@angular/material/sort';

/**
 * Decorador de FacturaHCComponent
 */
@Component({
  selector: 'app-factura-hc',
  templateUrl: './factura-hc.component.html',
  styleUrls: ['./factura-hc.component.css']
})

/**
 * Clase que maneja la lógica de la factura
 */
export class FacturaHCComponent implements OnInit {

  /**
   * Indica el origen de los datos para llenar la tabla
   */
  dataSource = new MatTableDataSource<Pedido>();

  /**
   * Indica las columnas a mostrar en la tabla de los datos recibidos
   */
  displayedColumns: string[] = ['nom_producto', 'precio', 'cantidad', 'total'];

  /**
   * Permite ordenar los datos de la tabla
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Indica el total a pagar
   */
  total = 0;

  /**
   * Constructor de FacturaHCComponent
   * @param router objeto que se inyecta para las redirecciones
   * @param comunicacionCService objeto que se inyecta para obtener los pedidos de la factura
   */
  constructor(private router: Router,
    private comunicacionCService: ComunicacionCService) { }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {

    let pedidos: Pedido[] = this.comunicacionCService.getPedidosFactura();

    if (pedidos == undefined) {

      this.router.navigate(["/superfast/catalogo"]);

    } else {

      pedidos.forEach(pedido => {

        this.total = this.total + pedido.total;

      });

    }

    this.dataSource = new MatTableDataSource(pedidos);
    this.dataSource.sort = this.sort;

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

    this.router.navigate(["/hccauchos/catalogo"]);

  }

}
