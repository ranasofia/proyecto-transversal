import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.css']
})
export class FormularioUsuariosComponent implements OnInit {

  /**
 * Variable que indica el formulario del usuario
 */
  userForm: FormGroup;


  constructor() { }

  ngOnInit(): void {
    this.userForm = this.createFormGroup();
  }

  /**
   * Método que se encarga de configurar las validaciones del formulario de usuario
   * @returns grupoFormulario
   */
  createFormGroup() {
    return new FormGroup({

      id: new FormControl(),
      
      nombre: new FormControl('', [
        Validators.required
      ]),
      apellido: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('', [
        Validators.required
      ]),
      fechaNacimiento: new FormControl('', [
        Validators.required,
        ValidacionesPropias.edadValida
      ]),
      identificacion: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      celular: new FormControl('', [
        Validators.required,
        Validators.minLength(7)
      ]),
      direccion: new FormControl('', [
        Validators.required
      ]),
    });
  }

  /**
 * 
 * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
 */
  aceptar(event: Event): any {
    event.preventDefault();
  }
}
