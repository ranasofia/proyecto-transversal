import { ProductoDialogComponent } from 'src/app/components/superfast_components/producto-dialog/producto-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ComunicacionService } from 'src/app/_service/superfast_service/comunicacion.service';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/_model/superfast_model/Producto';
import { InicioService } from 'src/app/_service/superfast_service/inicio.service';
import { MatPaginator } from '@angular/material/paginator';

/**
 * Decorador de CatalogoSuperFastComponent
 */
@Component({
  selector: 'app-catalogo-super-fast',
  templateUrl: './catalogo-super-fast.component.html',
  styleUrls: ['./catalogo-super-fast.component.css']
})

/**
 * Clase que maneja la lógica del catálogo
 */
export class CatalogoSuperFastComponent implements OnInit {

  /**
   * Indica cuantas columnas tiene la grilla en la que se posiciona cada producto
   */
  gridColumns = 3;

  /**
   * Son los productos del catálogo
   */
  productos: Producto[];

  /**
   * Es el formato monetario del precio de cada producto
   */
  formatoMoneda: Intl.NumberFormat;

  /**
   * Es la variable que permite ordenar los productos
   */
  dataSource: MatTableDataSource<Producto>;

  /**
   * Son los productos que se filtran según la palabra clave
   */
  productosFiltrados: Producto[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Permite filtrar los productos a mostrar
   * @param filter variabe que posee la palabra clave por la que se filtra
   */
  dataFilter(filter: string) {

    this.dataSource.filter = filter.trim().toLocaleLowerCase();

    this.actualizarPaginador();

  }

  /**
   * Permite indicar el número de columnas de la grilla según el caso
   */
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  /**
   * Constructor de CatalogoSuperFastComponent
   * @param comunicacionService objeto que permite usar los servicios relacionados con los productos
   * @param dialog componente que se muestra como pestaña modal
   */
  constructor(private comunicacionService: ComunicacionService, private dialog: MatDialog, private inicioService: InicioService) {

    this.formatoMoneda = new Intl.NumberFormat('es-ES');

  }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {

    this.comunicacionService.getCatalogo().subscribe(data => {

      this.productos = data;

      this.productosFiltrados = data;

      for (var i = 0; i < this.productos.length; i++) {

        var longitud = this.productos[i].imagen_producto1.length;
        this.productos[i].imagen_producto1 = "https://www.superfastisw.tk/" + this.productos[i].imagen_producto1.substring(1, longitud);

      }

      this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.paginator = this.paginator;

      this.actualizarPaginador();


    });

  }

  actualizarPaginador() {


    let indiceInicial = (this.paginator.pageIndex + 1) * this.paginator.pageSize - this.paginator.pageSize;
    let indiceFinal = (this.paginator.pageIndex + 1) * this.paginator.pageSize - 1;

    this.productosFiltrados = this.dataSource.filteredData.slice(indiceInicial, indiceFinal + 1);

  }

  /**
   * Método que abre la pestaña modal
   */
  openDialog(producto: Producto) {
    this.dialog.open(ProductoDialogComponent, {
      data: { producto: producto }
    });
  }

}
