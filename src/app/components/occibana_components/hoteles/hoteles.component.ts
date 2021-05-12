import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/_model/occibana_model/Hotel';
import { HotelPrincipal } from 'src/app/_model/occibana_model/HotelPrincipal';
import { HotelService } from '../../../_service/occibana_service/hotel.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent implements OnInit {

  precio: any;

  hotelesPrincipales: HotelPrincipal;

  hotel: HotelPrincipal[];

  dataSource : MatTableDataSource<HotelPrincipal>;

  hotelesFiltrados: HotelPrincipal[];

  constructor(private hotelesService: HotelService, private router: Router) { }

  ngOnInit(): void {
    this.listadoHoteles();
  }

  listadoHoteles() {
    this.hotelesService.postListadoHoteles(this.hotelesPrincipales).subscribe(data => {
      this.hotel = data;
      this.hotelesFiltrados = data;
      
    },
    err => {
      if (err == 401) {
        this.router.navigate(['/error/:401/:Error en el servidor'])
      }
    });
  }

  hotelesFilter(hotelFiltred: string) {
    let dataSource = new MatTableDataSource(this.hotel);

    dataSource.filter = hotelFiltred.trim().toLocaleLowerCase();

    this.hotelesFiltrados = dataSource.filteredData;
  }

  isPrecioDisponible(precioHotel: number): void {
    if (precioHotel == undefined ) {
      this.precio = "No disponible";
      console.log("Null");
      
    } else {
      this.precio = precioHotel;
      console.log("No  ullS");
      
    }
  }
}
