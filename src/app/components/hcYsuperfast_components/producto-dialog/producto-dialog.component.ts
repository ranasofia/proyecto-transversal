import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Decorador de ProductoDialogComponent
 */
@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.css']
})

/**
 * Clase que maneja la lógica de la pestaña modal que permita añadir al carrito un producto
 */
export class ProductoDialogComponent implements OnInit {

  /**
   * Es el formulario de especificación del producto
   */
  productoForm: FormGroup;

  /**
   * Constructor de ProductoDialogComponent
   */
  constructor() {

    this.productoForm = this.createFormGroup();

  }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {
  }

  /**
   * Permite configurar las validaciones del formulario
   * @returns grupoFormulario
   */
  createFormGroup() {
    return new FormGroup({
      especificaciones: new FormControl('', [
        Validators.required,
      ] ),
      cantidad: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  /**
   * Permite enviar un objeto al carrito
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
  enviarACarrito(event: Event): void{


  }

}
