import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioTransversalService } from 'src/app/_service/transversal_service/usuario-transversal.service';
import { Usuario } from 'src/app/_model/transversal_model/Usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogEliminarComponent } from 'src/app/components/transversal_components/usuarios/dialog-eliminar/dialog-eliminar.component'

/**
 * Decorador de UsuariosComponent
 */
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

/**
 * Clase que maneja la lógica del CRUD de usuarios
 */
export class UsuariosComponent implements OnInit {

  /**
   * Indica qué variables deben ser mostradas en la tabla
   */
  displayedColumns: string[] = ['nombre', 'apellido', 'celular', 'correo', 'usuario', 'fechaNacimiento', 'direccion', 'cedula', 'acciones'];

  /**
   * Es el origen de datos de la tabla
   */
  dataSource = new MatTableDataSource<Usuario>();

  /**
   * Permite ordenar los datos de la tabla
   */
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Permite paginar la tabla
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Constructor de UsuariosComponent
   * @param route objeto que permite cambiar de página
   * @param usuarioTransversalService objeto que permite usar los servicios relacionados con el usuario general
   * @param dialog objeto que permite invocar la venana modal
   */
  constructor(public route: ActivatedRoute, private usuarioTransversalService: UsuarioTransversalService, private dialog: MatDialog) { }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {

    var usuarios: Usuario[];
    this.usuarioTransversalService.getMostrarRegistros().subscribe(data => {

      usuarios = data;
      this.dataSource = new MatTableDataSource(usuarios);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })

  }


  /**
   * Método que se ejecuta cuando un componente hijo deja de estar activo
   * @param event variable que posee todos los datos del evento
   */
  onDeactivate(event) {

    this.ngOnInit();

  }

  /**
   * Permite abrir la ventana modal para confirmar la eliminación del usuario
   * @param id variable que posee la id del usuario a eliminar
   */
  openDialog(id) {

    this.dialog.afterAllClosed.subscribe(data => this.ngOnInit())
    this.dialog.open(DialogEliminarComponent, {
      data: { id: id },
    });
  }

  /**
   * Permite filtrar los usuarios de la tabla
   * @param filter variable que indica el término de la filtración
   */
  dataFilter(filter: string) {

    this.dataSource.filter = filter.trim().toLocaleLowerCase();

  }
}
