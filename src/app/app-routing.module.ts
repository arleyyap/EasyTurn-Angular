import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { PruebaComponent } from './components/users/prueba/prueba.component';
import { PersonalDataComponent } from './components/users/personal-data/personal-data.component';
import { RestauranteComponent } from './components/users/restaurante/restaurante/restaurante.component';


// Administrativo
import { CajaComponent } from './components/users/administrativo/caja/caja.component';
import { FinancieroComponent } from './components/users/administrativo/financiero/financiero.component';
import { AcademicoComponent } from './components/users/administrativo/academico/academico.component';
import { RolesComponent } from './components/users/administrativo/roles/roles.component';
import { AdministrativoComponent } from './components/users/administrativo/administrativo/administrativo.component';
import { gestionarAcademicoComponent } from './components/users/administrativo/gestionarAcademico/gestionarAcademico.component';
import { gestionarFinancieroComponent } from './components/users/administrativo/gestionarFinanciero/gestionarFinanciero.component';
import { gestionarCajaComponent } from './components/users/administrativo/gestionarCaja/gestionarCaja.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'offers', component: OffersComponent },
  {path: 'user/login', component: LoginComponent },
  {path: 'user/register', component: RegisterComponent },
  {path: 'user/profile', component: ProfileComponent },
  {path: 'user/prueba', component: PruebaComponent },
  {path: 'user/personal-data', component: PersonalDataComponent },
  {path: 'user/restaurante/restaurante', component: RestauranteComponent},
  {path: 'user/administrativo', component: AdministrativoComponent},
  {path: 'user/caja', component: CajaComponent},
  {path: 'user/financiero', component: FinancieroComponent},
  {path: 'user/academico', component: AcademicoComponent},
  {path: 'user/roles', component: RolesComponent},
  {path: 'user/gestionarAcademico', component: gestionarAcademicoComponent},
  {path: 'user/gestionarFinanciero', component: gestionarFinancieroComponent},
  {path: 'user/gestionarCaja', component: gestionarCajaComponent},
  {path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
