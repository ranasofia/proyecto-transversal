import { ClienteService } from './../../_service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/_model/Cliente';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Decorador de LoginComponent
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * Clase de LoginComponent
 */
export class LoginComponent implements OnInit {

  /**
   * Variable de tipo string que almacena el token de la sesión
   */
  token: string;

  /**
   * Variable de tipo FormGroup que contiene el formulario del Login
   */
  loginForm: FormGroup;

  /**
   * Variable de tipo boolean que permite mostrar en pantalla la cadena de texto
   * digitada en el input contraseña
   */
  hide = true;

  /**
   * Variable de tipo string que almacena la contraseña digitada en el input contraseña
   */
  contrasena: string;

  /**
   * Variable de tipo string que almacena el nombre de usuario en el input username
   */
  nombreUsuario: string;


  /**
   * Método que agrupa dentro del mismo form tanto el username como el password
   * @returns username y password con validaciones requeridas
   */
  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ] ),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  /**
   * Constructor que incializa las variables globales de LoginComponent
   * @param router 
   * @param clienteService 
   */
  constructor(private router: Router, private clienteService: ClienteService, 
    private _snackBar: MatSnackBar) {
    this.loginForm = this.createFormGroup();
  }

  /**
   * Implementación que se ejecuta una vez se inicia el LoginComponent
   */
  ngOnInit(): void {

    if(sessionStorage.getItem(environment.TOKEN) != undefined){

      this.router.navigate(['/historialCliente']);
    } 
  }

  /**
   * Método que valida el formulario, obtiene el token y redirige a la página principal
   */
  private iniciarSesion(){

    if (this.loginForm.valid) {

      const value = this.loginForm.value;

      var cliente = new Cliente(value.username, value.password);

      console.log(cliente);

      this.clienteService.getToken(cliente).subscribe(data => {

        sessionStorage.setItem(environment.TOKEN, data);
        this.router.navigate(['/historialCliente']);
        environment.USUARIO = cliente.usuario;
        environment.CONTRASENA = cliente.contrasena;

      }, err => {

        if(err.status == 400){

          this._snackBar.open('El usuario y/o contraseña son incorrectos', 'Cancel  ', {
            duration: 3000
          });
          this.onResetForm();

        }else {
          this.router.navigate([`/error/${err.status}/${err.statusText}`]);
          this.onResetForm();
        }
      });

    }

  }

  /**
   * Método que borra las cadenas de texto del formulario del login
   */
  onResetForm() {
    this.loginForm.reset();
  }

  /**
   * Método que obtiene los valores que se envían desde el formulario del login
   * @param event evento que se genera una vez se realiza el onSubmit del formulario
   */
  login(event: Event): any {
    event.preventDefault();

    this.iniciarSesion();

  }
}
