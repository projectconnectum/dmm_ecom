import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: "/main/home",pathMatch:'full' },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) =>m.AuthModule),
    
  },
  
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then((m) => m.MainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
