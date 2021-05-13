import { ProductoH } from '../../_model/hccauchos_model/ProductoH';
import { Component, OnInit } from '@angular/core';
import { ProductoDialogComponent } from './../producto-dialog/producto-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ComunicacionCService } from 'src/app/_service/hccauchos/comunicacion-c.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-catalogo-hc-cauchos',
  templateUrl: './catalogo-hc-cauchos.component.html',
  styleUrls: ['./catalogo-hc-cauchos.component.css']
})
 

  export class CatalogoHcCauchosComponent implements OnInit{

    /**
     * Indica cuantas columnas tiene la grilla en la que se posiciona cada producto
     */
    gridColumns = 3;
  
    /**
     * Son los productos del catálogo
     */
    productos: ProductoH[];
  
    /**
     * Es el formato monetario del precio de cada producto
     */
    formatoMoneda: Intl.NumberFormat;
  
    /**
     * Es la variable que permite ordenar los productos
     */
    dataSource: MatTableDataSource<ProductoH>;
  
    /**
     * Son los productos que se filtran según la palabra clave
     */
    productosFiltrados: ProductoH[];
  
    /**
     * Permite filtrar los productos a mostrar
     * @param filter variabe que posee la palabra clave por la que se filtra
     */
    dataFilter(filter: string) {
  
      // Filtrar con cadena de texto convertida en minúsculas
  
      var dataSource = new MatTableDataSource(this.productos);
  
      dataSource.filter = filter.trim().toLocaleLowerCase();
  
      this.productosFiltrados = dataSource.filteredData;
  
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
    constructor(private comunicacionService: ComunicacionCService, private dialog: MatDialog) {
  
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
  
          var longitud = this.productos[i].imagen.length;
          this.productos[i].imagen = "http://18.224.240.8:8080/" + this.productos[i].imagen.substring(1, longitud);
  
        }
  
  
      });
  
    }
  
    /**
     * Método que abre la pestaña modal
     */
    openDialog() {
      this.dialog.open(ProductoDialogComponent);
    }
  
  }
  
