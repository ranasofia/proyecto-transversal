import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

/**
 * Decorador de PaginaPrincipalComponent
 */
@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})

/**
 * Clase que maneja la lógica de la página principal
 */
export class PaginaPrincipalComponent implements OnInit {

  /**
   * Indica las imágenes que usa el slider
   */
  imagenes:any[]=[
    {name:'SUPERFAST',
    img:'assets/images/Superfast slider.jpg',
    },
    {
      name:'MOTOTAXI DELUXE',
      img:'assets/images/Mototaxi slider.jpg',
    },
    {
      name:'HCCAUCHOS',
      img:'assets/images/Hccauchos slider.jpg',
    },
    {
      name:'OCCIBANA',
      img:'assets/images/Occibana slider.jpg',
    }
  ];

  /**
   * Constructor de PaginaPrincipalComponent
   * @param _config variable que se inyecta para establecer las configuraciones del slider
   */
  constructor(private _config:NgbCarouselConfig) {
    _config.interval = 3000;
    _config.pauseOnHover = true;
    _config.showNavigationArrows = false;

   }

  /**
   * Método que se ejecuta al cargar la página
   */
  ngOnInit(): void {
  }

}
