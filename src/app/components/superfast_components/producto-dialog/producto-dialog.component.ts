import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Producto } from 'src/app/_model/superfast_model/Producto';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { InicioService } from 'src/app/_service/superfast_service/inicio.service';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';
import { environment } from 'src/environments/environment';

/**
 * Decorador de ProductoDialogComponent
 */
@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.css']
})

/**
 * Clase que maneja la lógica de la pestaña modal que permita añadir al carrito un producto
 */
export class ProductoDialogComponent implements OnInit {

  /**
   * Es el formulario de especificación del producto
   */
  productoForm: FormGroup;

  /**
   * Constructor de ProductoDialogComponent
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: {producto: Producto},
  private usuarioTransversalService: UsuarioTransversalService,
  private inicioService: InicioService,
  private _snackBar: MatSnackBar) {

    this.productoForm = this.createFormGroup();

  }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {
  }

  /**
   * Permite configurar las validaciones del formulario
   * @returns grupoFormulario
   */
  createFormGroup() {
    return new FormGroup({
      especificaciones: new FormControl('', [
        Validators.required,
      ] ),
      cantidad: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  /**
   * Permite enviar un objeto al carrito
   * @param event objeto que posee los datos del evento que ejecutó el envío del formulario
   */
  enviarACarrito(event: Event): void{

      const HELPER = new JwtHelperService();

      let usuarioSuperfast = new UsuarioSuperfast();

      let tokenGeneral = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN));
      let tokenSuperfast = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_SUPERFAST));

      usuarioSuperfast.id = tokenSuperfast.nameid;

      let usuarioIncompleto = new Usuario();
      usuarioIncompleto.correo = tokenGeneral.email;
      usuarioIncompleto.usuario = tokenGeneral.name;

      this.usuarioTransversalService.getUsuario(usuarioIncompleto).subscribe(data => {

        usuarioSuperfast.direccion = data.direccion;
        usuarioSuperfast.telefono = data.celular;
        this.data.producto.cantidad = this.productoForm.controls["cantidad"].value;

        this.inicioService.agregarAlCarrito(usuarioSuperfast, this.data.producto, this.productoForm.controls["especificaciones"].value).subscribe(data => {

          this._snackBar.open('Producto agregado al carrito con éxito', 'Cancel  ', {
            duration: 3000
          });

        });

      })

  }

}
