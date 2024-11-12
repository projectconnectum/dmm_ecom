import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-main-card',
  templateUrl: './product-main-card.component.html',
  styleUrls: ['./product-main-card.component.css']
})
export class ProductMainCardComponent {

  @Input() product:any;

}
