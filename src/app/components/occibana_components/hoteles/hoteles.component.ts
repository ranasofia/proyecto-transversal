import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Hotel } from 'src/app/_model/occibana_model/Hotel';
import { HotelPrincipal } from 'src/app/_model/occibana_model/HotelPrincipal';
import { HotelService } from 'src/app/_service/occibana_service/hotel.service';
import { MatPaginator } from '@angular/material/paginator';

/**
 * Decorador del Componente hoteles
 */
@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css'],
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
  dataSource: MatTableDataSource<Hotel>;

  /**
   * Array de tipo hotel que almacena todos los hoteles filtrados
   */
  hotelesFiltrados: Hotel[];

  /**
   * Objeto que permite hacer la paginación de la lista de hoteles destacados
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Constructor que inicializa hotelesService y routes
   * @param hotelesService Instancia de HotelService
   * @param router  Instancia de Router
   */
  constructor(
    private hotelesService: HotelService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  /**
   * Implementación que se ejecuta una vez se inicie el HotelesComponent
   */
  ngOnInit(): void {
    this.listadoHoteles();
  }

  /**
   * Método que hace llamado al método postListadoHoteles de HotelService
   */
  listadoHoteles(): void {
    this.hotelesService
      .postListadoHoteles(this.hotelesPrincipales)
      .subscribe((data) => {
        this.hotel = data;
        this.hotelesFiltrados = data;
        for (let i = 0; i < this.hotel.length; i++) {
          // Traida de imágenes del servicio
          this.hotelesFiltrados[i].imagen =
            'http://18.230.178.121:8081/' +
            this.hotelesFiltrados[i].imagen;
        }
        this.dataSource = new MatTableDataSource(this.hotel);
        this.dataSource.paginator = this.paginator;
        this.actualizarPaginador();
      });
  }

  /**
   * Método que realiza el filtro de los hoteles desde el input de búsqueda
   * @param hotelFiltred lo que llega del input
   */
  hotelesFilter(hotelFiltred: string): void {
    const dataSource = new MatTableDataSource(this.hotel);

    dataSource.filter = hotelFiltred.trim().toLocaleLowerCase();

    this.hotelesFiltrados = dataSource.filteredData;
  }

  /**
   * Método que permite redireccionar a el componente de MisReservas
   */
  onMisReservas(): void {
    this.router.navigate([
      '/occibana/hoteles/reservaHabitacion/' + 108,
      'misReservas',
    ]);
  }

  /**
   * Permite actualizar la información del paginador y los datos a mostrar
   */
  actualizarPaginador() {
    let indiceInicial =
      (this.paginator.pageIndex + 1) * this.paginator.pageSize -
      this.paginator.pageSize;
    let indiceFinal =
      (this.paginator.pageIndex + 1) * this.paginator.pageSize - 1;

    this.hotelesFiltrados = this.dataSource.filteredData.slice(
      indiceInicial,
      indiceFinal + 1
    );
  }
}
