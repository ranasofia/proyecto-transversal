
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { Notificacion } from 'src/app/_model/Notificacion';
import { ClienteService } from 'src/app/_service/cliente.service';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Cliente } from 'src/app/_model/Cliente';

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

    var indicador = false;

    do {

      this.clienteService.getHistorial("", usuario).subscribe(data => {

        this.notificaciones = data;
        this.dataSource = new MatTableDataSource(this.notificaciones);
        indicador = false;

      }, err => {

        //Vencimiento de token por ahora

        indicador = true;

        if (err.status == 401) {

          var cliente = new Cliente(environment.USUARIO, environment.CONTRASENA);

          this.clienteService.getToken(cliente).subscribe(data => {

            sessionStorage.setItem(environment.TOKEN, data);

          });

        }

      });

    }
    while (indicador);

    this.displayedColumns = ['conductor', 'ubicacion', 'destino', 'tarifa'];

  }

}
