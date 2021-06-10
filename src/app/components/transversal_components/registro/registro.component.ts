import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Conversion } from 'src/app/_model/utilidades/Conversion';
import { RegistroLoginOccibanaService } from 'src/app/_service/occibana_service/registro-login-occibana.service';
import { UsuarioHCCauchos } from 'src/app/_model/hccauchos_model/UsuarioHCCauchos';
import { RegistroHCService } from 'src/app/_service/hccauchos_service/registro-hc.service';
import { LoginHCService } from 'src/app/_service/hccauchos_service/login-hc.service';
import { RegistroSFService } from 'src/app/_service/superfast_service/registro-sf.service';
import { AdminService } from 'src/app/_service/superfast_service/admin.service';
import { UsuarioMototaxi } from 'src/app/_model/mototaxi_model/UsuarioMototaxi';
import { ClienteService } from 'src/app/_service/mototaxi_service/cliente.service';

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
   * Objeto que permite establecer validaciones propias
   */
  validacionesPropias = new ValidacionesPropias();

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
        Validators.minLength(7),
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
  constructor(private usuarioTransversalService: UsuarioTransversalService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private registroLoginOccibanaService: RegistroLoginOccibanaService,
    private registroHCService: RegistroHCService,
    private loginHCService: LoginHCService,
    private registroSFService: RegistroSFService,
    private adminService: AdminService,
    private clienteService: ClienteService) {
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
  private async registrar() {

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

      let cadenaRespuesta = "No se pudo registrar el usuario porque ya se encuentra registrado con un nombre de usuario y/o clave distinta y/o documento de identidad distinto en: ";
      let noRegistrable = false;
      let contador = 0;

      let usuarioOccibana = Conversion.convertirAOccibana(usuario);

      usuarioOccibana.contrasena = "";

      this.registroLoginOccibanaService.registrar(usuarioOccibana).subscribe(data => {

        if (data == "Este usuario o correo ya existe o esta registrado") {

          usuarioOccibana.contrasena = usuario.contrasena;
          this.registroLoginOccibanaService.getToken(usuarioOccibana).subscribe(data => {
            contador++
          }, err => {

            if (err.status == 400 || err.status == 401) {

              cadenaRespuesta += "Occibana, ";
              noRegistrable = true;
              contador++;

            }

          })

        } else {

          contador++;

        }

      })


      this.registroSFService.verificarCorreo(usuario.correo).subscribe(data => {

        if (data == "correo registrado,ingrese uno diferente") {

          let usuarioSuperfast = Conversion.convertirASuperFast(usuario);

          this.adminService.getToken(usuarioSuperfast).subscribe(data => {
             contador++
            }, err => {

            if (err.status == 400 || err.status == 401) {

              cadenaRespuesta += "Superfast, ";
              noRegistrable = true;
              contador++;

            }

          })


        } else {

          contador++;

        }

      })

      let usuarioHCCauchos = new UsuarioHCCauchos();
      usuarioHCCauchos = Conversion.convertirAHCCauchos(usuario);

      this.registroHCService.verificarCorreo(usuarioHCCauchos).subscribe(data => {
        contador++
      }, err => {

        if (err.status == 400) {

          this.loginHCService.getToken(usuarioHCCauchos).subscribe(data => { contador++ }, err => {

            if (err.status == 400 || err.status == 401) {

              cadenaRespuesta += "HCCauchos, ";
              noRegistrable = true;
              contador++;

            }

          })

        }

      })

      let usuarioMototaxi: UsuarioMototaxi = Conversion.convertirAMototaxi(usuario);
      this.usuarioTransversalService.verificarExistenciaUsuario(usuarioMototaxi).subscribe(data => {
        contador++;
      }, err => {

        if (err.status == 400) {

          this.clienteService.getToken(usuarioMototaxi).subscribe(data => { contador++ }, err => {

            if (err.status == 400 || err.status == 401) {

              cadenaRespuesta += "Mototaxi, ";
              noRegistrable = true;
              contador++;

            }


          })

        }

      })

      while (contador < 4) {

        await this.delay(300);

      }

      if (!noRegistrable) {

        this.usuarioTransversalService.registrar(usuario).subscribe(data => {

          this._snackBar.open('Usuario registrado exitosamente', 'Cancel  ', {
            duration: 3000
          });

          this.router.navigate(['/login']);

        });

      } else {


        cadenaRespuesta = cadenaRespuesta.substring(0, cadenaRespuesta.length - 2);
        this._snackBar.open(cadenaRespuesta, 'Cancel  ');

      }

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

  /**
 * Permite detener la ejecución por un tiempo estipulado
 * @param ms variable que indica el tiempo a detener la ejecución
 * @returns promesa
 */
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
