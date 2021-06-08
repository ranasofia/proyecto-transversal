import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Decorador de BarraProgresoService
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Clase que llama los servicios relacionados con la barra de progreso del aplicativo
 */
export class BarraProgresoService {

  /**
   * Variable reactiva que va a ser empleada para la barra de progreso
   */
  public progressBar = new Subject<string>();

  /**
   * Constructor de BarraProgresoService
   */
  constructor() { }
}
