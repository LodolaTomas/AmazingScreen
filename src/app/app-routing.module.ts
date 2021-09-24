import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,pathMatch: 'full'
  },
  {
    path: 'login', loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule)
  },
  { 
    path: 'admin', loadChildren: () => import('./module/admin/admin.module').then(m => m.AdminModule)
  },
  { 
    path: 'footer', loadChildren: () => import('./module/footer/footer.module').then(m => m.FooterModule)
  },
  {
    path: '**', redirectTo: '' 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
