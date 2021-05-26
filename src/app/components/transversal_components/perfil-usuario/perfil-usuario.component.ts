import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { ComunicacionCService } from 'src/app/_service/hccauchos_service/comunicacion-c.service';
import { ClienteService } from 'src/app/_service/mototaxi_service/cliente.service';
import { PerfilService as PerfilServiceOccibana } from 'src/app/_service/occibana_service/perfil.service';
import { PerfilService as PerfilServiceSuperfast } from 'src/app/_service/superfast_service/perfil.service';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Conversion } from 'src/app/_model/utilidades/Conversion';
import { AdminService } from 'src/app/_service/superfast_service/admin.service';
import { Router } from '@angular/router';
import { UsuarioMototaxi } from 'src/app/_model/mototaxi_model/UsuarioMototaxi';
import { LoginHCService } from 'src/app/_service/hccauchos_service/login-hc.service';
import { RegistroLoginOccibanaService } from 'src/app/_service/occibana_service/registro-login-occibana.service';
import { UsuarioOccibana } from 'src/app/_model/occibana_model/UsuarioOccibana';

/**
 * Decorador de PerfilUsuarioComponent
 */
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

/**
 * Clase que maneja la lógica de la actualización de los datos de perfil
 */
export class PerfilUsuarioComponent implements OnInit {

  /**
   * Es el formulario del perfil
   */
  perfilForm: FormGroup;
  /**
   * Permite mostrar u ocultar el valor del campo de la contraseña
   */
  hide = true;
  /**
   * Permite mostrar u ocultar el valor del campo de repetir contraseña
   */
  hide2 = true;
  /**
   * Posee los datos del usuario antes de actualizarlos
   */
  usuario: Usuario;

  /**
   * Constructor de PerfilUsuarioComponent
   * @param comunicacionCService objeto que permite usar los servicios de usuarios de HCCauchos
   * @param clienteService objeto que permite usar los servicios de usuarios de Mototaxi
   * @param perfilServiceOccibana objeto que permite usar los servicios de cambio de perfil de Occibana
   * @param perfilServiceSuperfast objeto que permite usar los servicios de cambio de perfil de Superfast
   * @param usuarioTransversalService objeto que permite usar los servicios de usuarios generales
   * @param datePipe objeto que permite cambiar el formato de las fechas
   * @param _snackBar objeto que permite mostrar mensajes que indican cómo fue el proceso
   * @param adminService objeto que permite usar los servicios de usuarios de Superfast
   * @param router objeto que permite ir a otro componente
   * @param loginHCService objeto que permite obtener el token de HCCauchos
   * @param registroLoginOccibanaService objeto que permite usar los servicios para el registro y login de Occibana
   */
  constructor(private comunicacionCService: ComunicacionCService,
    private clienteService: ClienteService,
    private perfilServiceOccibana: PerfilServiceOccibana,
    private perfilServiceSuperfast: PerfilServiceSuperfast,
    private usuarioTransversalService: UsuarioTransversalService,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    private adminService: AdminService,
    private router: Router,
    private loginHCService: LoginHCService,
    private registroLoginOccibanaService: RegistroLoginOccibanaService) {

    this.perfilForm = new FormGroup({

      nombre: new FormControl('', [
        Validators.required
      ]),
      apellido: new FormControl('', [
        Validators.required
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      claveVerificar: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        ValidacionesPropias.verificacionClave
      ]),
      celular: new FormControl('', [
        Validators.required,
        Validators.minLength(7)
      ]),
      nombreUsuario: new FormControl('', [
        Validators.required
      ]),
      fechaNacimiento: new FormControl('', [
        Validators.required,
        ValidacionesPropias.edadValida
      ]),
      documento: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      direccion: new FormControl('', [
        Validators.required
      ]),
    });

    this.llenarFormulario();

  }


  /**
   * Permite llenar los campos del formulario con los datos actuales del usuario
   */
  llenarFormulario(): void {

    const helper = new JwtHelperService();
    let token = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));

    let usuarioIncompleto = new Usuario();

    usuarioIncompleto.usuario = token.name;
    usuarioIncompleto.correo = token.email;

    this.usuarioTransversalService.getUsuario(usuarioIncompleto).subscribe(data => {

      this.perfilForm = new FormGroup({

        nombre: new FormControl(data.nombre, [
          Validators.required
        ]),
        apellido: new FormControl(data.apellido, [
          Validators.required
        ]),
        correo: new FormControl(data.correo, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(data.contrasena, [
          Validators.required,
          Validators.minLength(8)
        ]),
        claveVerificar: new FormControl(data.contrasena, [
          Validators.required,
          Validators.minLength(8),
          ValidacionesPropias.verificacionClave
        ]),
        celular: new FormControl(data.celular, [
          Validators.required,
          Validators.minLength(7)
        ]),
        nombreUsuario: new FormControl(data.usuario, [
          Validators.required
        ]),
        fechaNacimiento: new FormControl(this.datePipe.transform(data.fechaNacimiento, 'yyyy-MM-dd', 'UTC'), [
          Validators.required,
          ValidacionesPropias.edadValida
        ]),
        documento: new FormControl(data.cedula, [
          Validators.required,
          Validators.minLength(5)
        ]),
        direccion: new FormControl(data.direccion, [
          Validators.required
        ]),
      });

      this.usuario = data;

    });

  }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {

  }

  /**
   * Permite actualizar los datos del usuario
   */
  actualizar() {

    if (this.perfilForm.valid) {

      let usuarioActualizado = new Usuario();
      usuarioActualizado.nombre = this.perfilForm.controls["nombre"].value;
      usuarioActualizado.apellido = this.perfilForm.controls["apellido"].value;
      usuarioActualizado.correo = this.perfilForm.controls["correo"].value;
      usuarioActualizado.contrasena = this.perfilForm.controls["password"].value;
      usuarioActualizado.celular = this.perfilForm.controls["celular"].value;
      usuarioActualizado.usuario = this.perfilForm.controls["nombreUsuario"].value;
      usuarioActualizado.fechaNacimiento = this.perfilForm.controls["fechaNacimiento"].value;
      usuarioActualizado.cedula = this.perfilForm.controls["documento"].value;
      usuarioActualizado.direccion = this.perfilForm.controls["direccion"].value;

      //Cambio de datos en Superfast

      let usuarioSuperfast = Conversion.convertirASuperFast(this.usuario);
      let usuarioSuperfastActualizado = Conversion.convertirASuperFast(usuarioActualizado);

      this.adminService.getToken(usuarioSuperfast).subscribe(data => {

        sessionStorage.setItem(environment.TOKEN_SUPERFAST, data);

        const helper = new JwtHelperService();
        let tokenSuperfast = helper.decodeToken(data);

        usuarioSuperfastActualizado.id = tokenSuperfast.nameid;

        this.perfilServiceSuperfast.actualizarPerfil(usuarioSuperfastActualizado).subscribe(data => {

          this.adminService.getToken(usuarioSuperfastActualizado).subscribe(data => sessionStorage.setItem(environment.TOKEN_SUPERFAST, data));

        })

      });

      //Cambio de datos en Occibana

      let usuarioOccibana = Conversion.convertirAOccibana(this.usuario)
      let usuarioOccibanaActualizado = Conversion.convertirAOccibana(usuarioActualizado);

      this.registroLoginOccibanaService.getToken(usuarioOccibana).subscribe(data => {

        sessionStorage.setItem(environment.TOKEN_OCCIBANA, data);

        this.perfilServiceOccibana.cargarDatos(usuarioOccibana).subscribe(data => {

          let idUsuarioOccibana = data["datos"]["id"];

          let cascaronTemporalOccibana = {
            UsuarioRegistro: usuarioOccibana.usuario == usuarioOccibanaActualizado.usuario ? "" : usuarioOccibanaActualizado.usuario,
            NombreRegistro: usuarioOccibana.nombre == usuarioOccibanaActualizado.nombre ? "" : usuarioOccibanaActualizado.nombre,
            ApellidoRegistro: usuarioOccibana.apellido == usuarioOccibanaActualizado.apellido ? "" : usuarioOccibanaActualizado.apellido,
            CorreoRegistro: usuarioOccibana.correo == usuarioOccibanaActualizado.correo ? "" : usuarioOccibanaActualizado.correo,
            TelefonoRegistro: usuarioOccibana.telefono == usuarioOccibanaActualizado.telefono ? "" : usuarioOccibanaActualizado.telefono,
            UsuarioSession: usuarioOccibana.usuario,
            NombreSession: usuarioOccibana.nombre,
            ApellidoSession: usuarioOccibana.apellido,
            CorreoSession: usuarioOccibana.correo,
            TelefonoSession: usuarioOccibana.telefono,
            UsuarioIdSession: idUsuarioOccibana
          }

          this.perfilServiceOccibana.actualizarPerfil(cascaronTemporalOccibana).subscribe(data => {

            this.registroLoginOccibanaService.getToken(usuarioOccibanaActualizado).subscribe(data => sessionStorage.setItem(environment.TOKEN_OCCIBANA, data));

          })

        })

      });

      //Cambio de datos en Mototaxi

      let usuarioMototaxi = Conversion.convertirAMototaxi(this.usuario);
      let usuarioMototaxiActualizado = Conversion.convertirAMototaxi(usuarioActualizado);

      let usuarioMototaxiActualizadoMayus = { Nombrecl: usuarioMototaxiActualizado.nombrecl, Apellido: usuarioMototaxiActualizado.apellido, Email: usuarioMototaxiActualizado.email, Usuario: usuarioMototaxiActualizado.usuario, Contrasena: usuarioMototaxiActualizado.contrasena, FechaDeNacimiento: usuarioMototaxiActualizado.fechaDeNacimiento };

      this.clienteService.getToken(usuarioMototaxi).subscribe(data => {

        sessionStorage.setItem(environment.TOKEN_MOTOTAXI, data);

        this.clienteService.actualizarPerfil(usuarioMototaxi.usuario, usuarioMototaxiActualizadoMayus).subscribe(data => {

          let cascaronTemporal = new UsuarioMototaxi();
          cascaronTemporal.nombrecl = usuarioMototaxiActualizadoMayus.Nombrecl;
          cascaronTemporal.apellido = usuarioMototaxiActualizadoMayus.Apellido;
          cascaronTemporal.email = usuarioMototaxiActualizadoMayus.Email;
          cascaronTemporal.usuario = usuarioMototaxiActualizadoMayus.Usuario;
          cascaronTemporal.contrasena = usuarioMototaxiActualizadoMayus.Contrasena;
          cascaronTemporal.fechaDeNacimiento = usuarioMototaxiActualizadoMayus.FechaDeNacimiento;

          this.clienteService.getToken(cascaronTemporal).subscribe(data => sessionStorage.setItem(environment.TOKEN_MOTOTAXI, data));

        })

      });

      //Cambio de datos en HCCauchos

      let usuarioHCCauchos = Conversion.convertirAHCCauchos(this.usuario);
      let usuarioHCCauchosActualizado = Conversion.convertirAHCCauchos(usuarioActualizado);

      this.loginHCService.getToken(usuarioHCCauchos).subscribe(data => {

        sessionStorage.setItem(environment.TOKEN_HCCAUCHOS, data);

        const helper = new JwtHelperService();
        let tokenHCCauchos = helper.decodeToken(data);

        usuarioHCCauchosActualizado.user_id = tokenHCCauchos.nameid;
        usuarioHCCauchosActualizado.correo = usuarioHCCauchosActualizado.email;
        usuarioHCCauchosActualizado.clave = usuarioHCCauchosActualizado.password;

        this.comunicacionCService.cambiarCorreo(usuarioHCCauchosActualizado).subscribe(data => {

          this.comunicacionCService.cambiarClave(usuarioHCCauchosActualizado).subscribe(data => {

            this.loginHCService.getToken(usuarioHCCauchosActualizado).subscribe(data => sessionStorage.setItem(environment.TOKEN_HCCAUCHOS, data));

          })

        })

      });

      //Cambio de datos en Proyecto Transversal

      this.usuarioTransversalService.actualizarPerfil(this.usuario.usuario, usuarioActualizado).subscribe(data => {

        this.usuarioTransversalService.getToken(usuarioActualizado).subscribe(data => {

          sessionStorage.setItem(environment.TOKEN, data);

          this._snackBar.open('Información actualizada correctamente', 'Cancel  ', {
            duration: 3000
          });

          this.router.navigate(["/usuarios"]);

        })

      });

    }

  }

  /**
   * Permite actualizar los datos del usuario al pulsar el botón de actualizar
   * @param event objeto que tiene todos los datos del evento que activa este método
   */
  actualizarPerfil(event: Event): any {
    event.preventDefault();

    this.actualizar();
  }

}
