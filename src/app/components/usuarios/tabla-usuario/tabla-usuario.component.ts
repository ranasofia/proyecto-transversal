import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

export interface TablaUsuario {
  position: number;
  nombre: string;
  apellido: string;
  celular: number;
  correo: string;
  usuario: string;
  fechaNacimiento: Date;
  direccion: string;
  cedula: number;
  acciones: string
  }
  const ELEMENT_DATA: TablaUsuario[] = [
    {position: 1,nombre: 'Sofia', apellido: 'Lopera', celular:3505182806,correo: 'loperasofi@gmail.com',usuario: 'slopera',fechaNacimiento: new Date("2000-04-20") ,direccion: 'cra 5', cedula: 1007687660,acciones:'hola'},
    {position: 2, nombre: 'Ana', apellido: 'Riveros', celular:3508762806,correo: 'loperasofi01@gmail.com',usuario: 'alopera',fechaNacimiento: new Date("2001-02-02") ,direccion: 'cra 6', cedula: 100376660, acciones:'hola'}, 
  ];

@Component({
  selector: 'app-tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})

export class TablaUsuarioComponent implements OnInit {

displayedColumns: string[] = ['nombre', 'apellido', 'celular', 'correo', 'usuario','fechaNacimiento','direccion', 'cedula','acciones'];
dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }
  dataFilter(filter: string) {

  const helper = new JwtHelperService();


  }
}

