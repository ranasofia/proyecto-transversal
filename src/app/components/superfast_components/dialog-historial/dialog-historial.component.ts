import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetallePedido } from 'src/app/_model/superfast_model/DetallePedido';

/**
 * Decorador de DialogHistorialComponent
 */
@Component({
  selector: 'app-dialog-historial',
  templateUrl: './dialog-historial.component.html',
  styleUrls: ['./dialog-historial.component.css']
})

/**
 * Clase que maneja toda la lógica referente al modal que muestra los artículos de un pedido del historial
 */
export class DialogHistorialComponent implements OnInit {

  /**
   * Constructor de DialogHistorialComponent
   * @param data objeto que trae los datos transmitidos por la vista principal del historial
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: {articulos: DetallePedido}) { }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {


  }

}
