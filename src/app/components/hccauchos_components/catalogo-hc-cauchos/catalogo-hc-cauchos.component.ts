import { ProductoH } from 'src/app/_model/hccauchos_model/ProductoH';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ComunicacionCService } from 'src/app/_service/hccauchos_service/comunicacion-c.service';
import { MatDialog } from '@angular/material/dialog';
import { Carro } from 'src/app/_model/hccauchos_model/Carro';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidacionesPropias } from 'src/app/_model/utilidades/ValidacionesPropias';
import { MatPaginator } from '@angular/material/paginator';
/**
 * Decorador de CatalogoHcCauchosComponent
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

    /**
     * IDs de los productos del catálogo cuyo stock se está viendo superado
     */
    IDsProductoStockExcedido: number[] = [];

    /**
     * Objeto que permite establecer validaciones propias
     */
    validacionesPropias = new ValidacionesPropias();

    /**
     * Objeto que permite hacer la paginación de los productos del catálogo
     */
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
     * @param _snackBar objeto que se inyecta para mostrar mensajes informativos para el usuario
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
          this.productos[i].imagen = "data:image/png;base64," + this.productos[i].imagen.substring(0, longitud);

        }

        this.dataSource = new MatTableDataSource(this.productos);
        this.dataSource.paginator = this.paginator;

        this.actualizarPaginador();


      });

    }

    /**
     * Permite agregar a la lista de IDs de productos excedidos el ID del producto al detectar que una entrada del usuario supera el stock
     * @param event objeto que posee toda la información del evento que activó el método
     * @param numero indica el número que no debe ser excedido
     * @param id indica el id que debe ser almacenado en IDsProductoStockExcedido, al haber superado el stock disponible
     */
    noExceder(event: Event, numero: number, id: number){

      let valor = Number((event.target as HTMLInputElement).value);

      if(valor > numero){

        this.IDsProductoStockExcedido.push(id);

      }else{


        this.IDsProductoStockExcedido.forEach((element, index) => {

          if(element == id){

            this.IDsProductoStockExcedido.splice(index,1);

          }

        });

      }

    }


    /**
     * Permite agregar un pedido al carrito
     * @param cantidad variable que indica el número de existencias a agregar al carrito
     * @param producto objeto que posee el producto a agregar al carrito
     */
    agregarAlCarrito(cantidad: number, producto: ProductoH){

      if(cantidad != null && cantidad > 0 && producto.ca_actual > cantidad){

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

      }else if(cantidad == 0){

        this._snackBar.open('No ha indicado la cantidad', 'Cancel  ', {
          duration: 5000
        });

      }else{

        this._snackBar.open('No hay suficientes existencias en el stock', 'Cancel  ', {
          duration: 5000
        });

      }

    }

    /**
     * Permite actualizar la información del paginador y los datos a mostrar
     */
    actualizarPaginador() {

      let indiceInicial = (this.paginator.pageIndex + 1) * this.paginator.pageSize - this.paginator.pageSize;
      let indiceFinal = (this.paginator.pageIndex + 1) * this.paginator.pageSize - 1;

      this.productosFiltrados = this.dataSource.filteredData.slice(indiceInicial, indiceFinal + 1);

    }

  }

