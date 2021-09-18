import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipe/search.pipe';
import { AltaMonitorComponent } from 'src/app/components/Alta/alta-monitor/alta-monitor.component';
@NgModule({
  declarations: [
    AdminComponent,
    SearchPipe,
    AltaMonitorComponent
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
