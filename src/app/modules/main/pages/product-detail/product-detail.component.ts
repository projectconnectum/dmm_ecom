import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  productDescriptionItems: string[] = [];
  other_product: any[] = [];
  isLoading: boolean = true;
  
  productId: string | null = null;
  shopRef: string | null = null;

  mainImage: any;

  loadItem=Array(30).fill(0);

  ngOnInit(): void {
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
        this.productDescriptionItems = this.product.description.split('\n');
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
        this.getOtherProduct(res.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  getOtherProduct(id: any) {
    this.productService.getShopProductById(id).subscribe(
      res => {
        console.log(res);
        this.other_product = res.results;
      },
      error => {
        console.log(error);
      }
    );
  }

  selectProductToDetail(item: any) {
    console.log("selected", item);
    this.productService.setSelectedProduct(item);
    this.router.navigate(['/main/product']);
  }

  changeMainImg(img: any) {
    this.mainImage = img;
  }

  isExpanded: boolean = false;
  // for description
  maxItems: number = 4;
  showFullDescription: boolean = false;

  get visibleItems(): string[] {
    return this.showFullDescription ? this.productDescriptionItems : this.productDescriptionItems.slice(0, this.maxItems);
  }

  toggleView(): void {
    this.showFullDescription = !this.showFullDescription;
  }




  // commande section 

  orderDialog:boolean=false;

}