import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProductService } from 'src/app/services/product.service';

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories:any[]=[];
  products:any[]=[];
  products_popular:any[]=[];
  products_latest:any[]=[];
  products_best_seller:any[]=[];
  products_most_view:any[]=[];

  selectedtab:number=1;

  selected_product:any;

  defaultImg:string="assets/common/assets/imgs/default.png"

  

  constructor(private categorieService:CategorieService, private productService:ProductService,
    private renderer: Renderer2,private router: Router

  ){}

  ngOnInit(): void {
  
    this.load();
   
    
  }

 


  load(){
  this.getAllCat();
  this.getAllProduct();
  this.getAllPopProduct();
  this.getLatestProduct();
  this.getBestSeller();
  this.getMostView();
  }


  getAllCat(){
    this.categorieService.getAll().subscribe(
      res=>{
        console.log(res);
        this.categories=res.results;
      },
      err=>{
        console.log(err);
        
      }
    )
  }


  // get All product

  getAllProduct(){
    this.productService.getAll().subscribe(
      res=>{
        this.products=res.results;
      },
      err=>{
        console.log(err);
      }
    )
  }

  // get popular product

  getAllPopProduct(){
    this.productService.getAllPopular().subscribe(
      res=>{
        this.products_popular=res.results;
        
      },
      err=>{
        console.log(err);
      }
    )
  }

   // get popular product

   getLatestProduct(){
    this.productService.getLatest().subscribe(
      res=>{
        this.products_latest=res.results;
        
      },
      err=>{
        console.log(err);
      }
    )
  }

  // get best seller product 

  getBestSeller(){
    this.productService.getAllPopular().subscribe(
      res=>{
        this.products_best_seller=res.results;
        
      },
      err=>{
        console.log(err);
      }
    )
  }

  // get best seller product 

  getMostView(){
    this.productService.getAllPopular().subscribe(
      res=>{
        this.products_most_view=res.results;
      },
      err=>{
        console.log(err);
      }
    )
  }

  
  // get next popular product

  nextProduct(){
    var tab=this.selectedtab;
    this.productService.getNextProduct("globale").subscribe(
      res=>{
        console.log(res);
      if(tab==1){
        this.products=res.results;
      }else if(tab==2){
        this.products_best_seller=res.results;
      }else if(tab==3){
        this.products_most_view=res.results;
      }

      },
      err=>{
        console.log(err);
      }
    )
  }

   // get previous popular product

  prevProduct(){
    var tab=this.selectedtab;
    this.productService.getNextProduct("globale").subscribe(
      res=>{
        console.log(res);
      if(tab==1){
        this.products=res.results;
      }else if(tab==2){
        this.products_best_seller=res.results;
      }else if(tab==3){
        this.products_most_view=res.results;
      }

      },
      err=>{
        console.log(err);
      }
    )

  }

    // get next all product

    nextPopProduct(){
      this.productService.getNextProduct("popular").subscribe(
        res=>{
          console.log(res);
          this.products_popular=res.results;
        },
        err=>{
          console.log(err);
        }
      )
    }
  
     // get previous popular product
  
    prevPopProduct(){
      this.productService.getPrecProduct("popular").subscribe(
        res=>{
          console.log(res);
          this.products_popular=res.results;
        },
        err=>{
          console.log(err);
        }
      )
  
    }



  

  // formatage pour la description du produit 

  formatDescription(description: string): string {
    return description.replace(/\n/g, '<br>');
  }


  // select product for a quick view 
  selectProduct(product:any){
    this.selected_product=product;
    this.getShopInfo(product.shop_reference);

  }

  // get shop info 
  shopInfo:any;
  getShopInfo(id:any){
    this.productService.getShopById(id).subscribe(
      res=>{
        this.shopInfo=res;

        // active modal 
        // Simule un clic sur le bouton pour déclencher le modal
        const modalElement = document.getElementById('ModalQuickview');
        if (modalElement) {
          const bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
          bootstrapModal.show();
        }
      },
      error=>{
        console.log(error);
      }
    );

  }

  // get product for detail page 

  selectProductToDetail(item: any) {
    console.log("selected", item);
    this.router.navigate(['/main/product'], {
      queryParams: { id: item.id, shop_ref: item.shop_ref }
    });
  }




  

}
