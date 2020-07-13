import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MessageService } from './services/message.service';
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
import { ChartsModule } from 'ng2-charts';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { PruebaComponent } from './components/users/prueba/prueba.component';
import { PersonalDataComponent } from './components/users/personal-data/personal-data.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

// Administrativo
import { CajaComponent } from './components/users/administrativo/caja/caja.component';
import { FinancieroComponent } from './components/users/administrativo/financiero/financiero.component';
import { AcademicoComponent } from './components/users/administrativo/academico/academico.component';
import { RolesComponent } from './components/users/administrativo/roles/roles.component';
import { gestionarAcademicoComponent } from './components/users/administrativo/gestionarAcademico/gestionarAcademico.component';
import { gestionarFinancieroComponent } from './components/users/administrativo/gestionarFinanciero/gestionarFinanciero.component';
import { gestionarCajaComponent } from './components/users/administrativo/gestionarCaja/gestionarCaja.component';
import { AsyncPipe } from '@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { EstadisticaComponent } from './components/users/administrativo/estadistica/estadistica.component';
import {IngenieriasComponent} from './components/users/administrativo/ingenierias/ingenierias.component';
import {gestionarSistemasComponent} from './components/users/administrativo/gestionarSistemas/gestionarSistemas.component';
import {gestionarMultimediaComponent} from './components/users/administrativo/gestionarMultimedia/gestionarMultimedia.component';
import {gestionarElectronicaComponent} from './components/users/administrativo/gestionarElectronica/gestionarElectronica.component';
import {gestionarIndusltrialComponent} from './components/users/administrativo/gestionarIndustrial/gestionarIndustrial.component';
import {gestionarAgroindustrialComponent} from './components/users/administrativo/gestionarAgroindustrial/gestionarAgroindustrial.component';
import {profesoresSistemasComponent} from './components/users/administrativo/profesoresSistemas/profesoresSistemas.component';
import {profesoresMultimediaComponent} from './components/users/administrativo/profesoresMultimedia/profesoresMultimedia.component';
import {profesoresElectronicaComponent} from './components/users/administrativo/profesoresElectronica/profesoresElectronica.component';
import {mensajeComponent} from './components/users/administrativo/Mensaje/mensaje.component';


// Notificaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { FooterComponent } from './components/footer/footer.component';

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
    CajaComponent,
    FinancieroComponent,
    AcademicoComponent,
    RolesComponent,
    gestionarAcademicoComponent,
    gestionarFinancieroComponent,
    gestionarCajaComponent,
    FooterComponent,
    EstadisticaComponent,
    IngenieriasComponent,
    gestionarSistemasComponent,
    gestionarMultimediaComponent,
    gestionarElectronicaComponent,
    gestionarIndusltrialComponent,
    gestionarAgroindustrialComponent,
    profesoresSistemasComponent,
    profesoresMultimediaComponent,
    profesoresElectronicaComponent,
    mensajeComponent
],
  imports: [
    BrowserModule,
    ChartsModule,
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
  providers: [AngularFireAuth, AngularFirestore, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
