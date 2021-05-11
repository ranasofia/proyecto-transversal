import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Decorador de GenerarTokenRecuperarComponent
 */
@Component({
  selector: 'app-generar-token-recuperar',
  templateUrl: './generar-token-recuperar.component.html',
  styleUrls: ['./generar-token-recuperar.component.css']
})
/**
 * Clase de GenerarTokenRecuperarComponent
 */
export class GenerarTokenRecuperarComponent implements OnInit {
  /**
   * Variable de tipo FormGroup que contiene el formulario de Generar Token
   */
  generarForm: FormGroup;

  createFormGroup(){
    return new FormGroup({
      correoRecuperacion: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    })
  }

  constructor() { }

  ngOnInit(): void {
  }

  onResetForm() {
    this.generarForm.reset();
  }

  generar(event: Event): any {
    event.preventDefault();
  }
}
