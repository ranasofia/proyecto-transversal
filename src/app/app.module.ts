import { MasterComponent } from './components/master/master.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HistorialClienteComponent } from './components/mototaxi_components/historial-cliente/historial-cliente.component';
import { Not404Component } from './pages/not404/not404.component';
import { Error500Component } from './pages/error500/error500.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistroComponent } from './components/registro/registro.component';
import { CatalogoSuperFastComponent } from './components/superfast_components/catalogo-super-fast/catalogo-super-fast.component';
import { HotelesComponent } from './components/occibana_components/hoteles/hoteles.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { GenerarTokenRecuperarComponent } from './components/generar-token-recuperar/generar-token-recuperar.component';
import { HotelesPipe } from './pipes/hoteles.pipe';
import { ProductoDialogComponent } from './components/producto-dialog/producto-dialog.component';
import { CatalogoHcCauchosComponent } from './components/hccauchos_components/catalogo-hc-cauchos/catalogo-hc-cauchos.component';


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
    HotelesComponent,
<<<<<<< HEAD
    HotelesPipe,
    ProductoDialogComponent,
    

=======
    CatalogoHcCauchosComponent,
    HotelesPipe,
    ProductoDialogComponent,
    HotelesPipe,
    ProductoDialogComponent
>>>>>>> 2035906c558c57aa73b086a28cc26550c695c927
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
    MatSnackBarModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
