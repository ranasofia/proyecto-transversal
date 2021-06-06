import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetallePedido } from 'src/app/_model/superfast_model/DetallePedido';

@Component({
  selector: 'app-dialog-historial',
  templateUrl: './dialog-historial.component.html',
  styleUrls: ['./dialog-historial.component.css']
})
export class DialogHistorialComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {articulos: DetallePedido}) { }

  ngOnInit(): void {


  }

}
