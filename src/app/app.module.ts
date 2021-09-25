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
import { AdminModule } from './module/admin/admin.module';
import { FilterPipe } from './pipe/filter.pipe';
import { AltaGenComponent } from './components/Alta/alta-gen/alta-gen.component';
import { FooterModule } from './module/footer/footer.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MainComponent,
    CarruselComponent,
    SliderComponent,
    FilterPipe,
    AltaGenComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AdminModule,
    FooterModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule { }
