import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user:any=localStorage.getItem("user")!=null?JSON.parse(localStorage.getItem("user")!):null

  recharges:any[]=[];

  wallet:any;

  constructor(private router: Router,private transactionService:TransactionService){}

  ngOnInit(): void {

    if(this.user==null){
      this.router.navigate(['/auth/login']);
    }

    this.getAllRecharge();
    this.getWallet();
    
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






}
