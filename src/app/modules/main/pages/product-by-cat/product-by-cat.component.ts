import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-by-cat',
  templateUrl: './product-by-cat.component.html',
  styleUrls: ['./product-by-cat.component.css']
})
export class ProductByCatComponent {

  cat_id:any;
  cat:any;
  popular_product:any[]=[];
  lastest_products:any[]=[];

  isLoading:boolean=true;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cat_id = params['id'];
      console.log("cat_id",this.cat_id);
      // get products 
      this.getProducts(this.cat_id);

      // get categorie 
      this.getAllCat();
    });
  }

  constructor(private route:ActivatedRoute,private productService:ProductService,
    private categorieService:CategorieService,){};


  getProducts(id:any){
    this.productService.getProductByCategories(id).subscribe(
      res=>{
        console.log("Product cat",res);
        this.popular_product=res.results;
        this.isLoading=false;
      },
      err=>{
        console.log(err);

      }

    )
  }

  // get categorie with subcat 

  categories:any[]=[];
  selectedCat:any;
  getAllCat(){
    this.categorieService.getAll().subscribe(
      res=>{
        console.log(res);
        this.categories=res.results;
        this.categories.find((item)=>{
          if(item.id==this.cat_id){
            this.selectedCat=item;
            console.log("selected cat :",this.selectedCat);
          }
        })
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  /// list scrolling 

  selectedItemId: any = 'all'; 

  selectCategory(id: any) {
    this.selectedItemId = id;
    this.getProducts(id);
  }



}
