import { ClienteService } from './../../_service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/_model/Cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string;

  cliente: Cliente;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {

    this.cliente = new Cliente("aleja","02042020");
    this.clienteService.setUsuario(this.cliente);
    this.clienteService.getToken().subscribe(data => {
      this.token = data
    });

  }

}
