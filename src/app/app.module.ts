import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OffersComponent } from './components/offers/offers.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { PruebaComponent } from './components/users/prueba/prueba.component';
import { PersonalDataComponent } from './components/users/personal-data/personal-data.component';
import { RestauranteComponent } from './components/users/restaurante/restaurante/restaurante.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

// Administrativo
import { CajaComponent } from './components/users/administrativo/caja/caja.component';
import { AdministrativoComponent } from './components/users/administrativo/administrativo/administrativo.component';
import { FinancieroComponent } from './components/users/administrativo/financiero/financiero.component';
import { AcademicoComponent } from './components/users/administrativo/academico/academico.component';
import { RolesComponent } from './components/users/administrativo/roles/roles.component';
import { gestionarAcademicoComponent } from './components/users/administrativo/gestionarAcademico/gestionarAcademico.component';
import { gestionarFinancieroComponent } from './components/users/administrativo/gestionarFinanciero/gestionarFinanciero.component';
import { gestionarCajaComponent } from './components/users/administrativo/gestionarCaja/gestionarCaja.component';
import { AsyncPipe } from '@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// Notificaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductoComponent } from './components/users/restaurante/producto/producto.component';

import { FooterComponent } from './components/footer/footer.component';
import { TurnoRestauranteComponent } from './components/users/restaurante/turno-restaurante/turno-restaurante.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    OffersComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    PruebaComponent,
    PersonalDataComponent,
    RestauranteComponent,
    CajaComponent,
    AdministrativoComponent,
    FinancieroComponent,
    AcademicoComponent,
    RolesComponent,
    gestionarAcademicoComponent,
    gestionarFinancieroComponent,
    gestionarCajaComponent,
    ProductoComponent,
    FooterComponent,
    TurnoRestauranteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
