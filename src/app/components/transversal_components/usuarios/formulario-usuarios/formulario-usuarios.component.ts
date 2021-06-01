import { BarraProgresoService } from 'src/app/_service/utilidades/barra-progreso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';
import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.css'],
})
export class FormularioUsuariosComponent implements OnInit {

  /**
   * Variable que indica el formulario del usuario
   */
  userForm: FormGroup;

  /**
   * Variable que almacena el id de usuario que se va a editar
   */
  idUsuario: number;

  /**
   * Variable que valida que si está editando o registrando a un usuario
   */
  isEdicion: boolean;

  /**
   * Variable que almacena el objeto de usuario cargado
   */
  usuario: Usuario;
  /**
   * Constructor que incializa los servicios
   * @param trasversalService
   * @param router
   * @param route
   * @param snackBar
   * @param barraProgreso
   */
  constructor(
    private trasversalService: UsuarioTransversalService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private barraProgreso: BarraProgresoService,
    private datePipe: DatePipe
  ) {

  }

  /**
   * Implementación que se ejecuta una vez se inicia el FormularioUsuariosComponent
   */
  ngOnInit(): void {
    this.userForm = this.createFormGroup();
    // Toma el id que viene desde la url
    this.route.params.subscribe((params) => {
      this.idUsuario = params.id;

      this.isEdicion = params.id != null;
      // En caso de edición, se manda el id que viene desde la url
      if (this.isEdicion) {
        this.obtenerUsuario(this.idUsuario);
      }
    });

  }

  /**
   * Método que se encarga de configurar las validaciones del formulario de usuario
   * @returns grupoFormulario
   */
  createFormGroup() {
    return new FormGroup({
      id: new FormControl(),

      nombre: new FormControl(
        '', [
          Validators.required
        ]),
      apellido: new FormControl(
        '', [
          Validators.required
        ]),
      email: new FormControl(
        '', [
          Validators.required,
          Validators.email
        ]),
      username: new FormControl(
        '', [
          Validators.required
        ]),
      fechaNacimiento: new FormControl(
        '', [
        Validators.required,
        ValidacionesPropias.edadValida,
      ]),
      identificacion: new FormControl(
        '', [
        Validators.required,
        Validators.minLength(5),
      ]),
      celular: new FormControl(
        '', [
        Validators.required,
        Validators.minLength(7),
      ]),
      direccion: new FormControl(
        '', [
          Validators.required
        ]),
    });
  }

  /**
   * Método que carga el objeto usuario con los datos que vienen del formulario
   */
  cargarDatosUsuario(): void {
    let usuario: Usuario;
    usuario = new Usuario();
    usuario.idUsuario = this.idUsuario;
    usuario.nombre = this.userForm.value['nombre'];
    usuario.apellido = this.userForm.value['apellido'];
    usuario.celular = this.userForm.value['celular'];
    usuario.correo = this.userForm.value['email'];
    usuario.usuario = this.userForm.value['username'];

    if(this.isEdicion){
      usuario.contrasena = this.usuario.contrasena;
    }else{
      usuario.contrasena = "123456789";
    }
    usuario.fechaNacimiento = this.userForm.value['fechaNacimiento'];
    usuario.direccion = this.userForm.value['direccion'];
    usuario.cedula = this.userForm.value['identificacion'];

    // Si esta editando un usuario
    if (this.isEdicion) {
      this.editarUsuario(usuario.idUsuario, usuario);
    } else {
      // Si está registrando a un usuario nuevo
      this.registrarUsuario(usuario);
    }
  }

  /**
   *
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
  aceptar(event: Event): any {
    event.preventDefault();
    this.cargarDatosUsuario();
  }

  /**
   * Método que obtiene el usuario por medio de su id y lo cargar en el formulario
   * @param idUsuario
   */
  obtenerUsuario(idUsuario: number): void {
    this.barraProgreso.progressBar.next("1");
    this.trasversalService.getMostrarUsuario(idUsuario).subscribe(
      (data) => {
        this.usuario = data as Usuario;
        this.userForm = new FormGroup({
          id: new FormControl(this.usuario.idUsuario),
          nombre: new FormControl(this.usuario.nombre, [Validators.required]),
          apellido: new FormControl(this.usuario.apellido, [Validators.required]),
          email: new FormControl(this.usuario.correo, [Validators.required, Validators.email]),
          username: new FormControl(this.usuario.usuario, [Validators.required]),
          fechaNacimiento: new FormControl(this.datePipe.transform(this.usuario.fechaNacimiento, 'yyyy-MM-dd','UTC'), [
            Validators.required,
            ValidacionesPropias.edadValida,
          ]),
          identificacion: new FormControl(this.usuario.cedula, [
            Validators.required,
            Validators.minLength(5),
          ]),
          celular: new FormControl(this.usuario.celular, [
            Validators.required,
            Validators.minLength(7),
          ]),
          direccion: new FormControl(this.usuario.direccion, [Validators.required]),
        });
        this.barraProgreso.progressBar.next("2");
      });
  }

  /**
   * Método que registra a un nuevo usuario
   * @param usuarioNuevo
   */
  registrarUsuario(usuarioNuevo: Usuario): void {
    this.barraProgreso.progressBar.next("1");
    this.trasversalService.registrar(usuarioNuevo).subscribe(
      (data) => {
        this.snackBar.open('Usuario creado satisfactoriamente', 'Cerrar', {
          duration: 3000
        })
        this.barraProgreso.progressBar.next("2");
        this.router.navigate(['/usuarios']);
      });
  }

  /**
   * Método que edita la información de un usuario
   * @param idUsuario
   * @param usuario
   */
  editarUsuario(idUsuario: number, usuario: Usuario): void {
    this.barraProgreso.progressBar.next("1");
    this.trasversalService.putModificarRegistro(idUsuario, usuario).subscribe(
      (data) => {
        this.snackBar.open('El usuario ha sido editado satisfactoriamente', 'Cerrar', {
          duration: 3000
        })
        this.barraProgreso.progressBar.next("2");
        this.router.navigate(['/usuarios']);
      });
  }
}
