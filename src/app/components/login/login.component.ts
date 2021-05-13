import { ClienteService } from 'src/app/_service/mototaxi_service/cliente.service';
import { RegistroHCService } from 'src/app/_service/hccauchos_service/registro-hc.service';
import { LoginHCService } from 'src/app/_service/hccauchos_service/login-hc.service';
import { RegistroLoginOccibanaService} from 'src/app/_service/occibana_service/registro-login-occibana.service';
import { UsuarioTransversalService } from 'src/app/_service/usuario-transversal.service';
import { GuardianService } from 'src/app/_service/guardian.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Usuario } from 'src/app/_model/Usuario';
import { UsuarioMototaxi } from 'src/app/_model/mototaxi_model/UsuarioMototaxi';
import {Conversion} from 'src/app/_model/Conversion';

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
      email: new FormControl('', [
        Validators.required,
        Validators.email
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
  constructor(private router: Router, private usuarioTransversalService: UsuarioTransversalService,
    private registroHCService: RegistroHCService, private loginHCService: LoginHCService,private _snackBar: MatSnackBar, private guardianService: GuardianService) {
    this.loginForm = this.createFormGroup();
  }

  /**
   * Implementación que se ejecuta una vez se inicia el LoginComponent
   */
  ngOnInit(): void {


    /*
    var usuario = new Usuario();

    usuario.nombre = "Don";
    usuario.apellido = "Papa4";
    usuario.celular = "3133607479";
    usuario.correo = "donpapa4@gmail.com";
    usuario.usuario = "El señor don papa 4";
    usuario.contrasena = "Papaencriptada";
    usuario.direccion = "Calle don papa";
    usuario.cedula = "342843218";
    usuario.fechaNacimiento = "2001-06-24";

    console.log("Obteniendo token general...");

    this.usuarioTransversalService.registrar(usuario).subscribe(data => console.log(data));


    this.usuarioTransversalService.getToken(usuario).subscribe(data => {
      console.log(data)
      sessionStorage.setItem(environment.TOKEN, data);
    });

    console.log("Obteniendo usuario general con el token general...")

    //Se llama el método para obtener el usuario y para eso es que obtuvimos el token general

    console.log("Convirtiendo usuario general en usuario de mototaxi...");

    var usuarioMototaxi = Conversion.convertirAMototaxi(usuario);

    this.clienteService.registrar(usuarioMototaxi).subscribe(data => console.log(data));

    console.log("Obteniendo token mototaxi...");

    this.clienteService.getToken(usuarioMototaxi).subscribe(data => console.log(data));


    */

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

      var usuario = new Usuario();
      usuario.correo = value.email;
      usuario.contrasena = value.password;

      this.usuarioTransversalService.getToken(usuario).subscribe(data => {

        sessionStorage.setItem(environment.TOKEN, data);
        this.router.navigate(['/superfast/catalogo']);
        localStorage.setItem("correo", usuario.correo);
        localStorage.setItem("contrasena", usuario.contrasena);

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
