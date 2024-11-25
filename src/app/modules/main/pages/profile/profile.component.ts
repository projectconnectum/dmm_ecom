import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user:any=localStorage.getItem("user")!=null?JSON.parse(localStorage.getItem("user")!):null

  recharges:any[]=[];

  activeTab: string = 'pills-prof1';

  wallet:any;

  constructor(private route: ActivatedRoute,private router: Router,private transactionService:TransactionService ,private toastService:NgToastService){}

  ngOnInit(): void {

    if(this.user==null){
      this.router.navigate(['/auth/login']);
    }

    this.route.queryParams.subscribe(params => {
      if (params['tab_id']) {
        this.setActiveTab(params['tab_id']);
      }
    });

    this.getAllRecharge();
    this.getWallet();
    this.getOrder();
    
  }

  // setActiveTab

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }




  getAllRecharge(){
   this.transactionService.getAllRecharges().subscribe(
    (res)=>{
      console.log("rexharges_liste:",res);
      this.recharges=res.results
    },
    (err)=>{
      console.log("error",err);
    }
   );

  }

  // walet

  getWallet(){
    this.transactionService.getWalletAmount().subscribe(
      res=>{
        console.log("walet",res);
        this.wallet=res;
      },
      err=>{
        console.log("error",err);
      }
    );
  }



  showRechargeModal:boolean=false;
  selectedPayment: 'DEFAULT' | 'CORIS' | null = 'DEFAULT';
  montant: any ;

  onRechargeClick() {
    // Implémentez ici la logique de recharge
    console.log('Montant:', this.montant);
    console.log('Méthode de paiement:', this.selectedPayment);

    const data={
      "provider":this.selectedPayment,
      "amount":this.montant
    }

    this.transactionService.recharger(data).subscribe(
      (res)=>{
        console.log(res);
        const payment_url=res.bill_url;
        this.getAllRecharge();
        this.showRechargeModal=false;
         // Ouvrir l'URL de paiement dans une nouvelle fenêtre
         if(this.selectedPayment=="DEFAULT"){
          window.open(payment_url, '_blank');
         }
        
      },
      (err)=>{
        console.log(err);
      }
    );
 
  }

  // get orders history


  orders:any[]=[];
  getOrder(){
    this.transactionService.getCmd().subscribe(
      res=>{
        console.log("order",res);
        this.orders=res.results;
      },
      errr=>{
        console.log(errr);
      }
    );
  }


  getStatusText(status: string): string {
    switch (status) {
      case 'DELIVERED':
        return 'Livré';
      case 'WAITING_FOR_PAYMENT':
        return 'En attente de paiement';
      case 'PROCESSING':
        return 'En cours de traitement';
      default:
        return 'Statut inconnu';
    }
  }
  
  getPaymentMessage(status: string): string {
    switch (status) {
      case 'DELIVERED':
        return 'Commande déjà livrée.';
      case 'PROCESSING':
        return 'Commande en cours de traitement.';
      default:
        return '';
    }
  }
  
  payOrder(item: any) {
    console.log(`Paiement en cours pour la commande #${item.id}`);
    // Ajouter ici l'intégration avec l'API de paiement.
  }

  paid(id:any){
    this.transactionService.paidOrder(id).subscribe(
      res=>{
        console.log(res);
        this.getOrder();
        this.toastService.success({
          detail: "Commande payée",
          duration: 10000,
          position: "topRight",
        });
      },
      err=>{

        console.log(err);

        this.toastService.error({
          detail: "Solde insufissant",
          summary:"Recharger votre portefeuille",
          duration: 10000,
          position: "topRight",
        });

        this.showRechargeModal=true;

      }
    );
  }






}
