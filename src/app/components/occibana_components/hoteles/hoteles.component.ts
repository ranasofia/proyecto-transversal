import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/_model/occibana_model/Hotel';
import { HotelPrincipal } from 'src/app/_model/occibana_model/HotelPrincipal';
import { HotelService } from 'src/app/_service/occibana_service/hotel.service';

/**
 * Decorador del Componente hoteles
 */
@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})

/**
 * Clase del componente de hoteles
 */
export class HotelesComponent implements OnInit {

  /**
   * Variable de tipo HotelPrincipal
   */
  hotelesPrincipales: HotelPrincipal;

  /**
   * Array de tipo hotel que almacena todos los hoteles de Occibana
   */
  hotel: Hotel[];

  /**
   * Componente de Angular material que se usa para realizar el filtro de los hoteles
   */
  dataSource : MatTableDataSource<HotelPrincipal>;

  /**
   * Array de tipo hotel que almacena todos los hoteles filtrados
   */
  hotelesFiltrados: Hotel[];

  /**
   * Constructor que inicializa hotelesService y routes
   * @param hotelesService Instancia de HotelService
   * @param router  Instancia de Router
   */
  constructor(private hotelesService: HotelService, private router: Router) { }

  /**
   * Implementación que se ejecuta una vez se inicie el HotelesComponent
   */
  ngOnInit(): void {
    this.listadoHoteles();
  }

  /**
   * Método que hace llamado al método postListadoHoteles de HotelService
   */
  listadoHoteles() {
    this.hotelesService.postListadoHoteles(this.hotelesPrincipales).subscribe(data => {
      this.hotel = data;
      this.hotelesFiltrados = data;
      for (var i = 0; i < this.hotel.length; i++) {
        // Traida de imágenes del servicio
        var longitud = this.hotelesFiltrados[i].imagen.length;
        this.hotelesFiltrados[i].imagen = "https://www.occibanaisw.tk/" + this.hotelesFiltrados[i].imagen.substring(1, longitud);

      }
    },
    // Error
    err => {
      if (err == 401) {
        this.router.navigate(['/error/:401/:Error en el servidor'])
      }
    });
  }

  /**
   * Método que realiza el filtro de los hoteles desde el umpu de búsqueda
   * @param hotelFiltred lo que llega del input
   */
  hotelesFilter(hotelFiltred: string) {
    let dataSource = new MatTableDataSource(this.hotel);

    dataSource.filter = hotelFiltred.trim().toLocaleLowerCase();

    this.hotelesFiltrados = dataSource.filteredData;
  }

}
