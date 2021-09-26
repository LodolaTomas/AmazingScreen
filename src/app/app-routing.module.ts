import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CheckLoginGuard } from './guards/check-login.guard';

const routes: Routes = [
  { 
    path: '', component: HomeComponent,pathMatch: 'full'
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'admin', component:AdminComponent, canActivate:[CheckLoginGuard]
  },
  {
    path: 'footer', component:FooterComponent
  },
  {
    path: '**', redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
