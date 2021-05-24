import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Decorador de RegistroComponent
 */
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

/**
 * Clase que maneja la lógica de la interfaz de registro
 */
export class RegistroComponent implements OnInit {

  /**
   * Es el formulario del registro
   */
  registroForm: FormGroup;
  /**
   * Permite mostrar u ocultar el valor del campo de la contraseña
   */
  hide = true;
  /**
   * Permite mostrar u ocultar el valor del campo de repetir contraseña
   */
  hide2 = true;

  /**
   * Permite configurar las validaciones del formulario
   * @returns grupoFormulario
   */
  createFormGroup() {
    return new FormGroup({

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
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      validacionContrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        ValidacionesPropias.verificacionClave
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
   * Constructor de RegistroComponent
   * @param usuarioTransversalService objeto que permite usar los servicios del usuario general
   * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
   */
  constructor(private usuarioTransversalService: UsuarioTransversalService, private _snackBar: MatSnackBar) {
    this.registroForm = this.createFormGroup();
  }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {
  }


  /**
   * Permite llevar a cabo el registro una vez se cumple con las validaciones
   */
  private registrar() {

    if (this.registroForm.valid) {

      var usuario = new Usuario();

      usuario.nombre = this.registroForm.controls["nombre"].value;
      usuario.apellido = this.registroForm.controls["apellido"].value;
      usuario.correo = this.registroForm.controls["email"].value;
      usuario.usuario = this.registroForm.controls["username"].value;
      usuario.contrasena = this.registroForm.controls["password"].value;
      usuario.fechaNacimiento = this.registroForm.controls["fechaNacimiento"].value;
      usuario.cedula = this.registroForm.controls["identificacion"].value;
      usuario.celular = this.registroForm.controls["celular"].value;
      usuario.direccion = this.registroForm.controls["direccion"].value;

      this.usuarioTransversalService.registrar(usuario).subscribe(data => {
        this._snackBar.open('Usuario registrado exitosamente', 'Cancel  ', {
          duration: 3000
        });
      }, err => {

        if (err.status == 400) {

          this._snackBar.open('El usuario ya existe', 'Cancel  ', {
            duration: 3000
          });

        }

      });

    }

  }

  /**
   * Permite iniciar el proceso de registro
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
  registro(event: Event): any {
    event.preventDefault();

    this.registrar();

  }

}
