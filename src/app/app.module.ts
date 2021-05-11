import { MasterComponent } from './components/master/master.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HistorialClienteComponent } from './components/historial-cliente/historial-cliente.component';
import { Not404Component } from './pages/not404/not404.component';
import { Error500Component } from './pages/error500/error500.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegistroComponent } from './components/registro/registro.component';
import { CatalogoSuperFastComponent } from './components/catalogo-super-fast/catalogo-super-fast.component';
import { HotelesComponent } from './components/occibana_components/hoteles/hoteles.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { GenerarTokenRecuperarComponent } from './components/generar-token-recuperar/generar-token-recuperar.component';
import { HotelesPipe } from './pipes/hoteles.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterComponent,
    HistorialClienteComponent,
    Not404Component,
    Error500Component,
    RegistroComponent,
    HotelesComponent,
    RecuperarContrasenaComponent,
    GenerarTokenRecuperarComponent,
    CatalogoSuperFastComponent,
    HotelesPipe,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
