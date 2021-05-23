import { Router } from '@angular/router';
import { Usuario } from 'src/app/_model/Usuario';
import { RecuperarContrasenaService } from 'src/app/_service/recuperar-contrasena.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Decorador de GenerarTokenRecuperarComponent
 */
@Component({
  selector: 'app-generar-token-recuperar',
  templateUrl: './generar-token-recuperar.component.html',
  styleUrls: ['./generar-token-recuperar.component.css']
})
/**
 * Clase que maneja la logica de la interfaz de GenerarTokenRecuperarComponent
 */
export class GenerarTokenRecuperarComponent implements OnInit {
  /**
   * Variable de tipo FormGroup que contiene el formulario de Generar Token
   */
  generarForm: FormGroup;

  /**
   * Permite configurar las validaciones del formulario
   * @returns 
   */
  createFormGroup(){
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    });
  }

  /**
   * Constructor de GenerarTokenRecuperarComponent
   * @param recuperar objeto que permite usar los servicios del recuperar contraseña
   * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
   */
  constructor(private recuperar:RecuperarContrasenaService,private _snackBar: MatSnackBar, private router: Router) {
    this.generarForm=this.createFormGroup();
  }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {
  }

  /**
   * Permite llevar a cabo generar el token de recuperacion de contraseña
   */
  private generartoken(){

    if(this.generarForm.valid){
      var usuario=new Usuario();

      usuario.correo=this.generarForm.controls["email"].value;
      this.recuperar.generar(usuario).subscribe(data => {
          this._snackBar.open('Recibira un correo con el token para continuar con el proceso', 'Cancel  ', {
            duration: 5000
          });
          this.router.navigate(['/recuperarContrasena']);
      }, err =>{
        if(err.status == 400){
          this._snackBar.open('No exite un usuario con este correo está inactivo o el token ha vencido, por favor verifique', 'Cancel  ', {
            duration: 5000
          });
        }
      });
    }
  }

  /**
   * Permite iniciar el proceso de generar token
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
  generar(event: Event): any {
    event.preventDefault();
    this.generartoken();
  }
}
