import { ClienteService } from './../../_service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/_model/Cliente';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string;
  loginForm: FormGroup;
  hide = true;
  contrasena: string;
  nombreUsuario: string;
  mensajeError: string;

  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ] ),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  constructor(private router: Router, private clienteService: ClienteService) {
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void {

    if(sessionStorage.getItem(environment.TOKEN) != undefined){

      this.router.navigate(['/historialCliente']);
    } 
  }


  private iniciarSesion(){


    if (this.loginForm.valid) {

      const value = this.loginForm.value;

      var cliente = new Cliente(value.username, value.password);

      console.log(cliente);

      this.clienteService.getToken(cliente).subscribe(data => {

        sessionStorage.setItem(environment.TOKEN, data);
        this.router.navigate(['/historialCliente']);
        environment.USUARIO = cliente.usuario;
        environment.CONTRASENA = cliente.contrasena;

      }, err => {

        if(err.status == 400){

          this.mensajeError = "El usuario y/o contraseña son incorrectos";

        }else {
          this.router.navigate([`/error/${err.status}/${err.statusText}`]);
        }
      });

    }

  }

  // Método que borra el la que viene del form
  onResetForm() {
    this.loginForm.reset();
  }

  // Método que muestra en consola que el login ha sido guardado
  onSavedForm() {
    console.log("Saved");
  }

  // Método que envía el correo y la contraseña a un objeto de tipo Cliente
  login(event: Event): any {
    event.preventDefault();

    this.iniciarSesion();

  }
}
