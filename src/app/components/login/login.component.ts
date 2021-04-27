import { ClienteService } from './../../_service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from 'src/app/_model/Cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string;
  loginForm: FormGroup; 
  cliente: Cliente;
  hide = true;

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ] ),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  constructor(private clienteService: ClienteService) { 
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void {

    this.cliente = new Cliente("aleja","02042020");
    this.clienteService.setUsuario(this.cliente);
    this.clienteService.getToken().subscribe(data => {
      this.token = data
    });

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
    if (this.loginForm.valid) {
      const value = this.loginForm.value;
      this.cliente.email = value.email;
      this.cliente.contrasena = value.password;
      console.log(`'${value.email}'`);
      console.log(`'${value.password}'`);
    }
  }
}
