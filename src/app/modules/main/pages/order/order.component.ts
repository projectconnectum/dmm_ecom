import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { GlobaleService } from 'src/app/services/globale.service';
import { ProductService } from 'src/app/services/product.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  product: any;
  other_product: any[] = [];
  isLoading: boolean = true;
  
  productId: string | null = null;
  shopRef: string | null = null;

  mainImage: any;

  loadItem=Array(30).fill(0);

  //isAuth:any=localStorage.getItem("isAuth");
  isAuth:any="true";


  // phone input 






// get world country 

world_country:any[]=[];
inputSelectedCountry:any ;

  getWorldCountry(){
    this.globaleService.getWorldountry().subscribe(
      (res)=>{
        this.world_country=res.data;
        console.log(res);
        this.inputSelectedCountry=this.world_country[0];
      },
      (err)=>{
        console.log(err);
        this.toastService.error({detail: 'Une erreur est survenue',duration:3000});
      }
    )
  }



  ngOnInit(): void {

    if(this.isAuth!="true"){
      this.router.navigate(["/auth/login"]);

    }else if (this.isAuth=="true"){
      this.route.queryParams.subscribe(params => {
        this.productId = params['id'];
        this.shopRef = params['shop_ref'];
        this.getProduct();
  
        console.log('Product ID:', this.productId);
        console.log('Shop Ref:', this.shopRef);
      });
  
      if (this.productId == null) {
        this.router.navigate(['/main/home']);
      }
    
      this.getShopInfo(this.shopRef);

      this.getWorldCountry();
    

    }
    
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private transactionService:TransactionService,
    private toastService:NgToastService,
    private globaleService:GlobaleService,
  ) {}

  formatDescription(description: string): string {
    return description.replace(/\n/g, '<br>');
  }

  getProduct() {
    this.isLoading = true;
    this.productService.getProduct(this.productId, this.shopRef).subscribe(
      res => {
        console.log("product", res);
        this.product = res;
        this.mainImage = this.product.medias[0].file;
        this,this.totalPrice=this.product.selling_price;
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  shopInfo: any;
  getShopInfo(id: any) {
    this.productService.getShopById(id).subscribe(
      res => {
        this.shopInfo = res;  
        console.log("shop",res);   

        // for delivery info 
        this.selectedCountry = this.shopInfo.deliveryInfo[0].id;
      
        this.onCountryChange();

        this.selectDeliveryOption(this.shopInfo.deliveryInfo[0].companies[0],
          this.shopInfo.deliveryInfo[0].companies[0].deliveryMode[0],
          this.shopInfo.deliveryInfo[0].companies[0].deliveryMode[0].deliveryRate[0])
       
      },
      error => {
        console.log(error);
      }
    );
  }

  // order  calcule

  quantity: number = 1;
  totalPrice:number=0;

  updateTotale(){
    this.totalPrice = this.product.selling_price * this.quantity;
  }

  incrementQuantity(){
    this.quantity++;
    this.updateTotale();
    this.SetDeliveryTotalPrice();
  }

  decrementQuantity(){
    if(this.quantity > 1){
      this.quantity--;
      this.updateTotale();
      this.SetDeliveryTotalPrice();
    }else{
      this.quantity = 1;
    }
   
  }

// adresse de livraison 

adresse:any={
  pays:"",
  ville:"",
  quartier:"",
  bp:"",

}




  // deault delivery info 

    selectedDelivery: any = {};
    delyveryTotalPrice:any;


  selectDeliveryOption(company: any, mode: any, rate: any): void {
    this.selectedDelivery = {
      companyName: company.name,
      modeName: mode.name,
      deliveryTime: rate.delai,
      option: rate.option,
      price: rate.price,
      tracking: mode.is_tracking ? 'Suivi disponible' : 'Suivi indisponible',
    };

    //set delivery taxes info ;
    this.SetDeliveryTotalPrice();

    this.mode_modal = false; // Ferme le modal après sélection
  }

  SetDeliveryTotalPrice (){
     if(this.selectedDelivery.modeName=="BATEAU"){
      this.delyveryTotalPrice = (this.product.delivery_taxe.volume*this.selectedDelivery.price)*this.quantity;
     }else{
      this.delyveryTotalPrice = (this.product.delivery_taxe.poids*this.selectedDelivery.price)*this.quantity;
     }


  }



  // mode de livraison 
  mode_modal:boolean=false;

  selectedCountry: string | null = null;
  selectedCountryDeliveryOptions: any[] = [];

  // whene country change 

  onCountryChange() {
    const countryId = this.selectedCountry
    
    if (countryId) {
      this.selectedCountry = countryId;
      // Filtrer les options de livraison pour le pays sélectionné
      this.selectedCountryDeliveryOptions = this.shopInfo.deliveryInfo.find(
        (country: any) => country.id === this.selectedCountry
      )?.companies || [];
    }
  }
  
  // get localization 

  latitude: number | undefined;
  longitude: number | undefined;
  locationSelected = false;
  // Fonction pour obtenir la position
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('Latitude:', this.latitude);
          console.log('Longitude:', this.longitude);
          this.locationSelected = true;
        },
        (error) => {
          console.error('Erreur lors de la récupération de la géolocalisation:', error);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }
  }


  // create a commade 

  Addcommande() {
    // Validation des données avant l'envoi
    if (!this.product) {
      this.toastService.error({
        detail: "Produit manquant",
        duration: 10000,
        position: "topRight",
      });
      return;
    }
  
    if (this.adresse.ville=="" ||this.adresse.quartier=="" ||this.adresse.bp=="" ||this.adresse.pays=="") {
      this.toastService.error({
        detail: "Adresse de livraison incomplete",
        duration: 10000,
        position: "topRight",
      });
      return;
    }
  
    if (!this.product.shop_reference) {
      this.toastService.error({
        detail: "Référence de la boutique introuvable",
        duration: 10000,
        position: "topRight",
      });
      return;
    }
  
    if (!this.totalPrice || !this.delyveryTotalPrice) {
      this.toastService.error({
        detail: "Mode de livraison non sélectionné",
        duration: 10000,
        position: "topRight",
      });
      return;
    }
  
    if (!this.selectedDelivery || !this.selectedDelivery.deliveryTime) {
      this.toastService.error({
        detail: "Mode de livraison non sélectionné",
        duration: 10000,
        position: "topRight",
      });
      return;
    }
  
    // Données valides, construction du payload
    const data = {
      order: JSON.stringify(this.product),
      delivery_address: JSON.stringify(this.adresse),
      shop: this.product.shop_reference,
      delivery_cost: this.delyveryTotalPrice,
      total:this.totalPrice + this.delyveryTotalPrice,
      quantity:this.quantity,
      delivery_delay: this.selectedDelivery.deliveryTime,
    };

    console.log(data);
  
    // Envoi de la commande
    this.transactionService.addCmd(data).subscribe(
      (res) => {
        console.log(res);
        this.toastService.success({
          detail: "Commande ajoutée avec succès",
          duration: 10000,
          position: "topRight",
        });
      },
      (err) => {
        console.log(err);
        this.toastService.error({
          detail: "Une erreur est survenue lors de l'ajout de la commande",
          duration: 10000,
          position: "topRight",
        });
      }
    );
  }


  //phone number 

  phoneNumber: any = {
    number: '',
    country: null,
  };

  onChange(event: any) {
    this.phoneNumber = {
      number: event.number,
      country: event.country,
    };
    console.log('Numéro complet :', event.number);
    console.log('Pays sélectionné :', event.country);
  }
  


}



