import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { CarruselComponent } from './page/carrusel/carrusel.component';
import { SliderComponent } from './page/slider/slider.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import {AngularFireStorageModule} from "@angular/fire/storage";
import { AngularFireModule } from '@angular/fire';
import { FilterPipe } from './pipe/filter.pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './components/admin/admin.component';
import { SearchPipe } from './pipe/search.pipe';
import { AltaMonitorComponent } from './components/Alta/alta-monitor/alta-monitor.component';
import { AltaplacadeVideoComponent } from './components/Alta/alta-grafica/alta-grafica.component';
import { AltaNetbookComponent } from './components/Alta/alta-netbook/alta-netbook.component';
import { AltaGenericaComponent } from './components/Alta/alta-generica/alta-generica.component';
import { NgxImageCompressService } from 'ngx-image-compress';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchPipe,
    MainComponent,
    CarruselComponent,
    SliderComponent,
    FilterPipe,
    LoginComponent,
    FooterComponent,
    AdminComponent,
    AltaMonitorComponent,
    AltaplacadeVideoComponent,
    AltaNetbookComponent,
    AltaGenericaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [/* {provide: LocationStrategy, useClass: HashLocationStrategy} */NgxImageCompressService],
  bootstrap: [AppComponent],
})
export class AppModule { }
