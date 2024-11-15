import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './main.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductByCatComponent } from './pages/product-by-cat/product-by-cat.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FavorisComponent } from './pages/favoris/favoris.component';
import { ShopsDetailComponent } from './pages/shops/shops-detail/shops-detail.component';

const routes: Routes = [

  {path:'',component:MainComponent,

    children:[
      {path:'',redirectTo:"/home",pathMatch:'full'},
      {path:'home',component:HomeComponent},
      {path:'order',component:OrderComponent},
      {path:'product',component:ProductDetailComponent},
      {path:'product/cat',component:ProductByCatComponent},
      {path:'shops',component:ShopsComponent},
      {path:'profile',component:ProfileComponent},
      {path:'favoris',component:FavorisComponent},
      {path:'shop/detail',component:ShopsDetailComponent},
    
]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
