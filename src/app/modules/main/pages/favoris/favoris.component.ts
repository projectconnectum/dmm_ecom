import { Component } from '@angular/core';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent {

  favoris=JSON.parse(localStorage.getItem('favorites') || '[]');

  

}
