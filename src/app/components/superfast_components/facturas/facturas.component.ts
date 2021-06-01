import { DetallePedido } from './../../../_model/superfast_model/DetallePedido';
import { ActivatedRoute } from '@angular/router';
import { SuperfastCarritoComponent } from 'src/app/components/superfast_components/superfast-carrito/superfast-carrito.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; 
import * as html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})

export class FacturasComponent implements OnInit {

  dataSource = new MatTableDataSource<DetallePedido>();
  export(){
   
    const options={
      margin: [0,0,0,0.8],
      filename:"Factura.pdf",
      image:{type:'jpeg'},
      html2canvas:{},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape', }
    };
    const content:Element =document.getElementById('content');
    html2pdf().from(content).set(options).save();
  }
  constructor() { }
  ngOnInit(): void {
  }
  dataFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLocaleLowerCase();
  }
}
