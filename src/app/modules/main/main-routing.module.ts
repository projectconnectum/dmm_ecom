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
import { ConditionComponent } from './components/footer/condition/condition.component';
import { FaqComponent } from './components/footer/faq/faq.component';
import { ContactComponent } from './components/footer/contact/contact.component';
import { SearchComponent } from './pages/search/search.component';

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
      {path:'term-condition',component:ConditionComponent},
      {path:'faq',component:FaqComponent},
      {path:'contact',component:ContactComponent},
      {path:'search',component:SearchComponent},
    
]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
