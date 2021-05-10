import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/_model/occibana_model/Hotel';
import { HotelService } from '../../../_service/occibana_service/hotel.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent implements OnInit {

  hoteles: Hotel[];

  constructor(private hotelesService: HotelService) { }

  ngOnInit(): void {
    this.listadoHoteles();
  }

  listadoHoteles() {
    this.hotelesService.postListadoHoteles().subscribe(data => {
      this.hoteles = data;
      console.log(data);
      
    },
    err => {
      console.log(err);
    });
  }

}
