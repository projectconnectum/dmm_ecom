import { Component, Input } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product-main-card',
  templateUrl: './product-main-card.component.html',
  styleUrls: ['./product-main-card.component.css']
})
export class ProductMainCardComponent {

  @Input() product: any;

 constructor(private toastService:NgToastService){}

  addToFavorites() {
    // Récupérer les favoris existants depuis le localStorage, ou initialiser une liste vide si non défini
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Vérifier si le produit est déjà dans les favoris en se basant sur l'ID
    const isAlreadyFavorite = favorites.some((fav: any) => fav.id === this.product.id);

    if (!isAlreadyFavorite) {
      // Ajouter le produit aux favoris
      favorites.push(this.product);
      // Mettre à jour le localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
      this.toastService.success(
        {
            detail:"Produit Ajouté aux favoris ",
            duration:10000,
            position:"topRight"
        });
      console.log('Produit ajouté aux favoris');
    } else {
      this.toastService.error(
        {
            detail:"Produit déjà dans les favoris ",
            duration:10000,
            position:"topRight"
        });
      console.log('Produit déjà dans les favoris');
    }
  }
}
