import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registroForm: FormGroup;
  hide = true;
  contrasena: string;

  createFormGroup() {
    return new FormGroup({

      nombre: new FormControl('', [
        Validators.required,
      ] ),
      apellido: new FormControl('', [
        Validators.required,
      ] ),
      email: new FormControl('', [
        Validators.required,
      ] ),
      username: new FormControl('', [
        Validators.required,
      ] ),
      password: new FormControl('', [
        Validators.required
      ]),
      validacionContrasena: new FormControl('', [
        Validators.required,
      ] ),
      fechaNacimiento: new FormControl('', [
        Validators.required,
      ] ),
      identificacion: new FormControl('', [
        Validators.required,
      ] ),
      celular: new FormControl('', [
        Validators.required,
      ] ),
      direccion: new FormControl('', [
        Validators.required,
      ] ),
    });
  }

  constructor() { 
    this.registroForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }
registro(event: Event): any {
    event.preventDefault();

    
    //this.iniciarSesion();

  }

}
