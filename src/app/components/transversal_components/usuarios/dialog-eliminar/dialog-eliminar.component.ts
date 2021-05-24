import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';

/**
 * Decorador de DialogEliminarComponent
 */
@Component({
  selector: 'app-dialog-eliminar',
  templateUrl: './dialog-eliminar.component.html',
  styleUrls: ['./dialog-eliminar.component.css']
})

/**
 * Clase que maneja la lógica de la interfaz de confirmación de eliminación de usuarios
 */
export class DialogEliminarComponent implements OnInit {

  /**
   * Constructor de DialogEliminarComponent
   * @param data variable que posee la id transmitida desde el componente padre para eliminar el usuario
   * @param usuarioTransversalService objeto que permite usar los servicios de los usuarios
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number}, private usuarioTransversalService: UsuarioTransversalService) {

  }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {


  }

  /**
   * Método que se encarga de eliminar el usuario
   */
  eliminarUsuario(){

    this.usuarioTransversalService.putEliminarRegistro(this.data.id).subscribe();

  }

}
