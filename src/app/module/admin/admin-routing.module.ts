import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from 'src/app/guards/check-login.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [{ path: 'admin', component: AdminComponent/* , canActivate:[CheckLoginGuard] */}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
