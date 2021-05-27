import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pedido } from 'src/app/_model/superfast_model/Pedido';
import { UsuarioSuperfast } from 'src/app/_model/superfast_model/UsuarioSuperfast';
import { ComunicacionService } from 'src/app/_service/superfast_service/comunicacion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-superfast-carrito',
  templateUrl: './superfast-carrito.component.html',
  styleUrls: ['./superfast-carrito.component.css']
})
export class SuperfastCarritoComponent implements OnInit {

  constructor(private comunicacionService: ComunicacionService) { }

  pedidos: Pedido[];

  ngOnInit(): void {

    const HELPER = new JwtHelperService();
    let tokenSuperfast = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_SUPERFAST));

    let usuarioSuperfast = new UsuarioSuperfast();
    usuarioSuperfast.id = tokenSuperfast.nameid;

    this.comunicacionService.getPedido(usuarioSuperfast).subscribe(data => {

      this.pedidos = data;

    })

  }


}
