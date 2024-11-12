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
    ProductByCatComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
