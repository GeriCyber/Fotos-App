import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaComponent } from './components/carga/carga.component';
import { FotosComponent } from './components/fotos/fotos.component';

const routes: Routes = [
  { path: 'fotos', component: FotosComponent },
  { path: 'cargar', component: CargaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'fotos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
