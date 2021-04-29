import { Error500Component } from './pages/error500/error500.component';
import { Not404Component } from './pages/not404/not404.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialClienteComponent } from './components/historial-cliente/historial-cliente.component';


const routes: Routes = [
  {path: '', component: LoginComponent},   
  {path: 'login', component: LoginComponent},
  {path: 'historialCliente', component: HistorialClienteComponent},
  {path: 'error/:status/:statusText', component: Error500Component},
  {path: '**', component: Not404Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
