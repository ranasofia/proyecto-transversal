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
<<<<<<< HEAD
   * Constructor de GenerarTokenRecuperarComponent
=======
   *
>>>>>>> 2035906c558c57aa73b086a28cc26550c695c927
   * @param recuperar objeto que permite usar los servicios del recuperar contraseña
   * @param _snackBar objeto que permite mostrar alertas durante un tiempo específico
   */
  constructor(private recuperar:RecuperarContrasenaService,private _snackBar: MatSnackBar) {
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
        if(data["mensaje"] == "alert('Recibira un correo con el link para continuar con el proceso')"){
          this._snackBar.open('Recibira un correo con el link para continuar con el proceso', 'Cancel  ', {
            duration: 3000
          });
        }else if(data["mensaje"] == "El usuario no exite o está sancionado, por favor verifique"){
          this._snackBar.open('El correo no existe o está sancionado, por favor verifique', 'Cancel  ', {
            duration: 3000
          });
        }else if(data["mensaje"] == "Token Vencido"){
          this._snackBar.open('Token Vencido', 'Cancel  ', {
            duration: 3000
          });
        }
      });
    }
  }

<<<<<<< HEAD
  onResetForm() {
    this.generarForm.reset();
  }
=======

>>>>>>> 2035906c558c57aa73b086a28cc26550c695c927

  /**
   * Permite iniciar el proceso de generar token
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
  generar(event: Event): any {
    event.preventDefault();
    this.generartoken();
  }
}
