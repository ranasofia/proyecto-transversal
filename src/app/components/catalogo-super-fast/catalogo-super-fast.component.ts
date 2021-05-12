import { ProductoDialogComponent } from './../producto-dialog/producto-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/_model/superfast_model/Producto';
import { ComunicacionService } from 'src/app/_service/superfast_service/comunicacion.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-catalogo-super-fast',
  templateUrl: './catalogo-super-fast.component.html',
  styleUrls: ['./catalogo-super-fast.component.css']
})
export class CatalogoSuperFastComponent implements OnInit {
  title = 'Card View Demo';

  gridColumns = 3;

  productos = [];

  formatoMoneda;

  dataSource;

  productosFiltrados = [];

  dataFilter(filter: string) {

    // Filtrar con cadena de texto convertida en minúsculas

    var dataSource = new MatTableDataSource(this.productos);

    dataSource.filter = filter.trim().toLocaleLowerCase();

    this.productosFiltrados = dataSource.filteredData;

  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  constructor(private comunicacionService: ComunicacionService, private dialog: MatDialog) {

    this.formatoMoneda = new Intl.NumberFormat('es-ES');

  }

  ngOnInit(): void {

    this.comunicacionService.getCatalogo().subscribe(data => {

      this.productos = data;

      this.productosFiltrados = data;

      for (var i = 0; i < this.productos.length; i++) {

        var longitud = this.productos[i].imagen_producto1.length;
        this.productos[i].imagen_producto1 = "https://www.superfastisw.tk/" + this.productos[i].imagen_producto1.substring(1, longitud);

      }


    });

  }
  openDialog() {
    this.dialog.open(ProductoDialogComponent);
  }

}
