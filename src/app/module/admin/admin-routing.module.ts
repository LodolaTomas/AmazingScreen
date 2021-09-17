import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginLocalGuard } from 'src/app/guards/check-login-local.guard';
import { CheckLoginGuard } from 'src/app/guards/check-login.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [{ path: '', component: AdminComponent, canActivate:[/* CheckLoginGuard,CheckLoginLocalGuard */]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
