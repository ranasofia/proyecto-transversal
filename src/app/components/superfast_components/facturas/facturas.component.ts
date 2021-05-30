import { ActivatedRoute } from '@angular/router';
import { SuperfastCarritoComponent } from 'src/app/components/superfast_components/superfast-carrito/superfast-carrito.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; 
import * as html2pdf from 'html2pdf.js';


export interface Factura{
  nombre_producto: string;
  cantidad: number;
}
const ELEMENT_DATA: Factura[] = [
  {nombre_producto: 'cualquiera', cantidad: 2}
];
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})

export class FacturasComponent implements OnInit {
  displayedColumns: string[] = ['nombre_producto','cantidad','valor_unitario','valor_total'];
  /**
   * Es el origen de datos de la tabla
   */
   dataSource = ELEMENT_DATA;

   /**
    * Permite ordenar los datos de la tabla
    */
   @ViewChild(MatSort) sort: MatSort;
 
  export(){
    const options={
      filename:"Report.pdf",
      image:{type:'jpeg'},
      html2canvas:{},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };
    const content:Element =document.getElementById('prueba');
    html2pdf().from(content).set(options).save();
  }
  constructor() { }
  ngOnInit(): void {
  }
  dataFilter(filter: string) {

  

  }
}
