import { ProductoH } from 'src/app/_model/hccauchos_model/ProductoH';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ComunicacionCService } from 'src/app/_service/hccauchos_service/comunicacion-c.service';
import { MatDialog } from '@angular/material/dialog';
import { Carro } from 'src/app/_model/hccauchos_model/Carro';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * Decorador de CatalogoHcCauchosComponet
 */
@Component({
  selector: 'app-catalogo-hc-cauchos',
  templateUrl: './catalogo-hc-cauchos.component.html',
  styleUrls: ['./catalogo-hc-cauchos.component.css']
})
/**
 * Clase que maneja la logica del catalogo
 */

  export class CatalogoHcCauchosComponent implements OnInit{

    /**
     * Indica cuantas columnas tiene la grilla en la que se posiciona cada producto
     */
    gridColumns = 3;

    /**
     * Productos del catálogo
     */
    productos: ProductoH[];

    /**
     * Es el formato monetario del precio de cada producto
     */
    formatoMoneda: Intl.NumberFormat;

    /**
     * Variable que permite ordenar los productos
     */
    dataSource: MatTableDataSource<ProductoH>;

    /**
     * Productos que se filtran según la palabra clave
     */
    productosFiltrados: ProductoH[];

    cantidad: number;

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
    constructor(private comunicacionService: ComunicacionCService, private dialog: MatDialog, private _snackBar: MatSnackBar) {

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


    agregarAlCarrito(cantidad: number, producto: ProductoH){

      if(cantidad != null && cantidad > 0){

        let carro = new Carro();
        carro.producto_id = producto.id;
        carro.cantidad = cantidad;
        carro.precio = producto.precio;
        carro.imagen = producto.imagen;
        carro.total = producto.precio*cantidad;

        let HELPER = new JwtHelperService();
        let tokenHCCauchos = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_HCCAUCHOS));
        let idUsuario = tokenHCCauchos.nameid;

        carro.user_id = idUsuario;

        this.comunicacionService.agregarAlCarrito(carro).subscribe(data => {

          this._snackBar.open('Producto agregado con éxito al carrito', 'Cancel  ', {
            duration: 5000
          });

          this.ngOnInit();

        });

      }

    }

  }

