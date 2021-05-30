import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Pedido } from 'src/app/_model/hccauchos_model/Pedido';
import { UsuarioHCCauchos } from 'src/app/_model/hccauchos_model/UsuarioHCCauchos';
import { ComunicacionCService } from 'src/app/_service/hccauchos_service/comunicacion-c.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hccauchos-carrito',
  templateUrl: './hccauchos-carrito.component.html',
  styleUrls: ['./hccauchos-carrito.component.css']
})
export class HccauchosCarritoComponent implements OnInit {

  constructor(private comunicacionCService: ComunicacionCService) { }

  pedidos: Pedido[];

  ngOnInit(): void {

    const HELPER = new JwtHelperService();
    let tokenHCCauchos = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN_HCCAUCHOS));

    let idUsuario = tokenHCCauchos.nameid;

    this.comunicacionCService.getCarrito(idUsuario).subscribe(data => {

      this.pedidos = data;

    })

  }

}
