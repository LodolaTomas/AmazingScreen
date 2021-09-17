import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarruselComponent } from './page/carrusel/carrusel.component';
import { SliderComponent } from './page/slider/slider.component';

import { SearchPipe } from './pipe/search.pipe';
import { FilterPipe } from './pipe/filter.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import {AngularFireStorageModule} from "@angular/fire/storage";
import { AngularFireModule } from '@angular/fire';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MainComponent,
    FooterComponent,
    CarruselComponent,
    SliderComponent,
    SearchPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
