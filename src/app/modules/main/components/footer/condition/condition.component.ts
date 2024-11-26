import { Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent {
  
  constructor() { }

  article1:String=" Les présentes Conditions Générales d'Utilisation et de Vente (CGUV) ont pour objet de définir les relations contractuelles entre DIGITAL KEYS SARL (DIGITAL KEYS) et l’utilisateur des services du site et de l’application. Les présentes CGUV sont accessibles sur le site et l’application à la rubrique «CGUV».Constituant le contrat entre la société DIGITAL KEYS et l'utilisateur, l'inscription sur le site et l’application est précédée de l’acceptation des CGUV. Chaque utilisateur accepte expressément, sans aucune réserve ni restriction, les présentes CGUV. En cas de non-acceptation des CGUV, l'utilisateur se doit de renoncer aux services proposés par le site et l’application. En utilisant le site et l’application d'une quelconque manière, incluant, mais ne se limitant pas à visiter ou naviguer sur le site et l’application, vous adhérez à ces conditions générales d’utilisation et de vente."

  ngOnInit(): void { }

}
