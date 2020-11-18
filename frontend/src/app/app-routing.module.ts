import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { EdicionComponent } from './components/edicion/edicion.component';


const routes: Routes = [
  {
    path: 'edicion',
    component: EdicionComponent
  },
  {
    path: '',
    component: ConsultaComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'nuevo',
    component: FormularioComponent
  },
  // {
  //   path: '**',
  //   redirectTo: 'login'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
