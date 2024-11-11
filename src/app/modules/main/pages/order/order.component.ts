import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

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
  isAuth:any=true;




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
    

    }
    
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
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
  }

  decrementQuantity(){
    if(this.quantity > 1){
      this.quantity--;
      this.updateTotale();
    }else{
      this.quantity = 1;
    }
   
  }


  // deault delivery info 

    selectedDelivery: any = {};
  


  selectDeliveryOption(company: any, mode: any, rate: any): void {
    this.selectedDelivery = {
      companyName: company.name,
      modeName: mode.name,
      deliveryTime: rate.delai,
      option: rate.option,
      price: rate.price,
      tracking: mode.is_tracking ? 'Suivi disponible' : 'Suivi indisponible',
    };
    this.mode_modal = false; // Ferme le modal après sélection
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


}



