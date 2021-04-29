import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private URL: string = '/api/cliente';

  constructor() { }

}
