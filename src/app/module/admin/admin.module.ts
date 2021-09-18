import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipe/search.pipe';
import { AltaMonitorComponent } from 'src/app/components/Alta/alta-monitor/alta-monitor.component';
import { AltaNetbookComponent } from 'src/app/components/Alta/alta-netbook/alta-netbook.component';
import { AltaplacadeVideoComponent } from 'src/app/components/Alta/alta-grafica/alta-grafica.component';
@NgModule({
  declarations: [
    AdminComponent,
    SearchPipe,
    AltaMonitorComponent,
    AltaNetbookComponent,
    AltaplacadeVideoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[SearchPipe]
})
export class AdminModule { }
