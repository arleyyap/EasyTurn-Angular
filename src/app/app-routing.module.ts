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
// Administrativo
import { CajaComponent } from './components/users/administrativo/caja/caja.component';
import { FinancieroComponent } from './components/users/administrativo/financiero/financiero.component';
import { AcademicoComponent } from './components/users/administrativo/academico/academico.component';
import { RolesComponent } from './components/users/administrativo/roles/roles.component';
import { gestionarAcademicoComponent } from './components/users/administrativo/gestionarAcademico/gestionarAcademico.component';
import { gestionarFinancieroComponent } from './components/users/administrativo/gestionarFinanciero/gestionarFinanciero.component';
import { gestionarCajaComponent } from './components/users/administrativo/gestionarCaja/gestionarCaja.component';
import {EstadisticaComponent} from './components/users/administrativo/estadistica/estadistica.component';
import {IngenieriasComponent} from './components/users/administrativo/ingenierias/ingenierias.component';
import {gestionarSistemasComponent} from './components/users/administrativo/gestionarSistemas/gestionarSistemas.component';
import {gestionarMultimediaComponent} from './components/users/administrativo/gestionarMultimedia/gestionarMultimedia.component';
import {gestionarElectronicaComponent} from './components/users/administrativo/gestionarElectronica/gestionarElectronica.component';
import {gestionarIndusltrialComponent} from './components/users/administrativo/gestionarIndustrial/gestionarIndustrial.component';
import {gestionarAgroindustrialComponent} from './components/users/administrativo/gestionarAgroindustrial/gestionarAgroindustrial.component';
import {profesoresSistemasComponent} from './components/users/administrativo/profesoresSistemas/profesoresSistemas.component';
import {profesoresMultimediaComponent} from './components/users/administrativo/profesoresMultimedia/profesoresMultimedia.component';
import {profesoresElectronicaComponent} from './components/users/administrativo/profesoresElectronica/profesoresElectronica.component';
import {mensajeComponent} from  './components/users/administrativo/Mensaje/mensaje.component'
const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'user/register', component: RegisterComponent },
  {path: 'user/profile', component: ProfileComponent },
  {path: 'user/prueba', component: PruebaComponent },
  {path: 'user/personal-data', component: PersonalDataComponent },
  {path: 'user/caja', component: CajaComponent},
  {path: 'user/financiero', component: FinancieroComponent},
  {path: 'user/academico', component: AcademicoComponent},
  {path: 'user/roles', component: RolesComponent},
  {path: 'user/gestionarAcademico', component: gestionarAcademicoComponent},
  {path: 'user/gestionarFinanciero', component: gestionarFinancieroComponent},
  {path: 'user/gestionarCaja', component: gestionarCajaComponent},
  {path: 'user/estadistica', component: EstadisticaComponent},
  {path: 'user/ingenierias', component: IngenieriasComponent},
  {path: 'user/gestionarSistemas', component: gestionarSistemasComponent},
  {path: 'user/gestionarMultimedia', component: gestionarMultimediaComponent},
  {path: 'user/gestionarElectronica', component: gestionarElectronicaComponent},
  {path: 'user/gestionarIndustrial', component: gestionarIndusltrialComponent},
  {path: 'user/gestionarAgroindustrial', component: gestionarAgroindustrialComponent},
  {path: 'user/profesoresSistemas', component: profesoresSistemasComponent},
  {path: 'user/profesoresMultimedia', component: profesoresMultimediaComponent},
  {path: 'user/profesoresElectronica', component: profesoresElectronicaComponent},
  {path: 'user/mensaje', component: mensajeComponent},

  {path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
