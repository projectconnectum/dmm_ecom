import { AfterViewInit, Component, Input } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-product-card1',
  templateUrl: './product-card1.component.html',
  styleUrls: ['./product-card1.component.css']
})
export class ProductCard1Component implements AfterViewInit {
@Input() product:any;


  
ngAfterViewInit() {
  $('[data-fancybox="gallery"]').fancybox({
      // Vous pouvez ajouter d'autres options ici
  });
}

}
