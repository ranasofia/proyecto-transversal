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

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})

export class FacturasComponent implements OnInit {

  displayedColumns: string[] = ['nombreprodet', 'v_unitario', 'cantidad','v_total'];

  dataSource = new MatTableDataSource<Pedido>();

  total = 0;

  @ViewChild(MatSort) sort: MatSort;

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
  constructor(private carritoService: CarritoService,
    private router: Router) { }
  ngOnInit(): void {

    let pedidos: Pedido[] = this.carritoService.getPedidosFactura();

    if(pedidos == undefined){

      this.router.navigate(["/superfast/catalogo"]);

    }else{

      pedidos.forEach(element => {

        this.total = this.total + element.compras[0].v_total;

      });

    }

    this.dataSource = new MatTableDataSource(pedidos);
    this.dataSource.sort = this.sort;

  }

  dataFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }
}
