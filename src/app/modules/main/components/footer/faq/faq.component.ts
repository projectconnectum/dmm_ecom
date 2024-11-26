import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {

  openIndex: number | null = null;

  faqItems = [
    {
      question: "Qu'est-ce qu'une centrale d'achat ?",
      answer: "Une centrale d'achat est une structure qui regroupe des entreprises afin de négocier des prix plus avantageux auprès des fournisseurs.Elle permet aux entreprises d'acheter des produits ou des services en gros et en détail."
    },
    {
      question: "Dream More vend où et à qui ?",
      answer: "Les avantages de l’application Dream More sont tels :Réduction des coûts : les entreprises adhérentes peuvent réaliser des économies importantes sur leurs achats.\n Accès à un large choix de produits et services. Gain de temps.Possibilité de discuter la taille, quantités, coût de livraison à son domicile ou lieu de travail.Réactivité du service client"
    },
    {
      question: "Quels sont les avantages d'adhérer à une centrale d'achat ?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
  ];

  toggleItem(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

}
