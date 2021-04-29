import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialClienteComponent } from './components/historial-cliente/historial-cliente.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'historialCliente', component: HistorialClienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
