import { AfterViewInit, Component, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-product-card-slider',
  templateUrl: './product-card-slider.component.html',
  styleUrls: ['./product-card-slider.component.css']
})

export class ProductCardSliderComponent  implements AfterViewInit{

  @Input() product:any;


  
  ngAfterViewInit() {
    // if (typeof $.fn.fancybox === 'function') {
    //   $('[data-fancybox="gallery"]').fancybox({
    //     // Ajoutez d'autres options ici si nécessaire
    //     buttons: ["close"], // Affiche le bouton de fermeture
    //     closeExisting: true
    //   });
    // } else {
    //   console.error("Fancybox n'est pas chargé correctement.");
    // }
  }
  


}
