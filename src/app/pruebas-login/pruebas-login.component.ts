import { ClienteService } from './../_service/cliente.service';
import { Cliente } from './../_model/Cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pruebas-login',
  templateUrl: './pruebas-login.component.html',
  styleUrls: ['./pruebas-login.component.css']
})
export class PruebasLoginComponent implements OnInit {
  token: string;
  constructor(private clienteService: ClienteService) { 

  }

  ngOnInit(): void {
    var cliente= new Cliente("aleja","02042020");
    this.clienteService.setUsuario(cliente);

    this.clienteService.getToken().subscribe(data => this.token = data);
  }

}
