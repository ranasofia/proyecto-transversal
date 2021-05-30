import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  imagenes:any[]=[
    {name:'SUPERFAST',
    img:'assets/images/superfast.png',
    },
    {
      name:'MOTOTAXI DELUXE',
      img:'assets/images/mototaxi.png',
    },
    {
      name:'HCCAUCHOS',
      img:'assets/images/hccauchos.png',
    },
    {
      name:'OCCIBANA',
      img:'assets/images/occibana.png',
    }
  ];

  constructor(private _config:NgbCarouselConfig) {
    _config.interval = 3000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = false;

   }

  ngOnInit(): void {
  }

}
