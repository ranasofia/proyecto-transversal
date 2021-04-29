import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../environments/environment';
import { ClienteService } from 'src/app/_service/cliente.service';
import { Component, OnInit , DoCheck} from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit , DoCheck{
  token: string;
  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    
  }

  ngDoCheck() : void{
    console.log("funcionó");
    this.token = sessionStorage.getItem(environment.TOKEN);
  }

  cerrarSesion(){
    const HELPER = new JwtHelperService();
    var nombre = HELPER.decodeToken(sessionStorage.getItem(environment.TOKEN))["name"];
    this.clienteService.putCerrarSesion(nombre).subscribe();
    this.clienteService.deleteEliminarToken(nombre).subscribe();
    sessionStorage.removeItem(environment.TOKEN);
  }
}
