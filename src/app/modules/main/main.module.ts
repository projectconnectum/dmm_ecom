import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductCard1Component } from './components/product-card1/product-card1.component';
import { ProductCardSliderComponent } from './components/product-card-slider/product-card-slider.component';
import { OrderComponent } from './pages/order/order.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCard2Component } from './components/product-card2/product-card2.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductByCatComponent } from './pages/product-by-cat/product-by-cat.component';
import { ProductMainCardComponent } from './components/product-main-card/product-main-card.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ShopsDetailComponent } from './pages/shops/shops-detail/shops-detail.component';
import { ShimerComponent } from './components/shimer/shimer.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { FavorisComponent } from './pages/favoris/favoris.component';
import { ConditionComponent } from './components/footer/condition/condition.component';
import { FaqComponent } from './components/footer/faq/faq.component';
import { ContactComponent } from './components/footer/contact/contact.component';
import { AuthModule } from '../auth/auth.module';
import { SearchComponent } from './pages/search/search.component';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    HeaderComponent,
    ProductCard1Component,
    ProductCardSliderComponent,
    OrderComponent,
    FooterComponent,
    ProductCard2Component,
    ProductDetailComponent,
    ProductByCatComponent,
    ProductMainCardComponent,
    ShopsComponent,
    ShopsDetailComponent,
    ShimerComponent,
    ProfileComponent,
    FavorisComponent,
    ConditionComponent,
    FaqComponent,
    ContactComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    DialogModule,
    AuthModule
    

    
  ]
})
export class MainModule { }
