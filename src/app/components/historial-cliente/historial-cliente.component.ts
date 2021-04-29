
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { Notificacion } from 'src/app/_model/Notificacion';
import { ClienteService } from 'src/app/_service/cliente.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.css']
})



export class HistorialClienteComponent implements OnInit {

  notificaciones: Notificacion[];
  dataSource = new MatTableDataSource<Notificacion>();
  displayedColumns: string[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {

    const helper = new JwtHelperService();
    
    var usuario = helper.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];
    
    this.clienteService.getHistorial("", usuario).subscribe(data => {

      this.notificaciones = data;
      this.dataSource = new MatTableDataSource(this.notificaciones);


    });

    this.displayedColumns = ['conductor', 'nombreCl', 'ubicacion', 'destino', 'tarifa'];

  }

}
