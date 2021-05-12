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


  hotelesPrincipales: HotelPrincipal;

  hotelesLista: any;

  constructor(private hotelesService: HotelService) { }

  ngOnInit(): void {
    this.listadoHoteles();
    this.hotelesLista = [];
  }

  listadoHoteles() {
    this.hotelesService.postListadoHoteles(this.hotelesPrincipales).subscribe(data => {
      this.hotelesLista = data;
      console.log(data);
      
    },
    err => {
      console.log(err);
    });
  }

}
