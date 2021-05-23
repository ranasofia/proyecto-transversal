import { Usuario } from './../../../_model/Usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioTransversalService } from './../../../_service/usuario-transversal.service';
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

  idUsuario: number;

  isEdicion: boolean;

  usuario: Usuario;

  constructor(
    private trasversalService: UsuarioTransversalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userForm = this.createFormGroup();

    this.route.params.subscribe(params => {
      let id = params.id;

      this.isEdicion = params.id != null;

      if(this.isEdicion) {
        this.obtenerUsuario(id);
      }

    })
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

  cargarDatosUsuario(): void {
    let usuario: Usuario
    usuario.idUsuario = null;
    usuario.nombre = this.userForm.value['nombre'];
    usuario.apellido = this.userForm.value['apellido'];
    usuario.cedula = this.userForm.value['celular'];
    usuario.correo = this.userForm.value['email'];
    usuario.usuario = this.userForm.value['username'];
    usuario.contrasena = "123456";
    usuario.fechaNacimiento = this.userForm.value['fechaNacimiento'];
    usuario.direccion = this.userForm.value['direccion'];
    usuario.cedula = this.userForm.value['identificacion'];

    if (this.isEdicion) {
      this.editarUsuario(usuario.idUsuario);
    } else {
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

  obtenerUsuario(idUsuario: number): void {
    this.trasversalService.getMostrarUsuario(idUsuario).subscribe(
      data => {
        this.usuario = data as Usuario
        this.userForm = new FormGroup({
          //Cargar los datos del formulario a editar
        })
      }, 
      err => {

      }
    )
  }

  registrarUsuario(usuarioNuevo: Usuario): void {
    this.trasversalService.registrar(usuarioNuevo).subscribe(
      data => {

      },
      error => {

      }
    )
  }

  editarUsuario(idUsuario: number): void {
    this.trasversalService.putModificarRegistro(idUsuario, null).subscribe(
      data => {

      },
      error => {

      }
    )
  }
}
