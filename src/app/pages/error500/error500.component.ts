import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/**
 * Decorador de Error500Component
 */
@Component({
  selector: 'app-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.css']
})
/**
 * Clase del Error500Component
 */
export class Error500Component implements OnInit {
  /**
   * Variable que guarda el status de el error
   * Variable que muestra el texto del error
   */
  status: string;
  statusTexts: string;
  /**
   * Constructor que inicializa la actividad del route
   * @param activatedroute 
   */
  constructor(private activatedroute: ActivatedRoute) { }
  /**
   * Implementacion que se ejecuta una vez que se inicia el componente
   */
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.status = params.get('status');
      this.statusTexts = params.get('statusText');
    });
  }

}
