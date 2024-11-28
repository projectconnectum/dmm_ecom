import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/globale/search.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  private subscription!:Subscription;
  searchItem:string="";
  products:any[]=[];

  isLoading:boolean=false;

  constructor(private searchService:SearchService, private productService:ProductService){}

  
  ngOnInit(): void {
    // get search item
    this.isLoading=true;
    this.subscription = this.searchService.searchItem.subscribe(
      (item) => {
        this.searchItem = item;
        this.getAllSearchProduct();
      }
    );
    console.log(this.searchItem);
    this.getAllSearchProduct()
  }

  getAllSearchProduct(){
    this.isLoading=true;
    this.productService.searchProduct(this.searchItem).subscribe(
      res=>{
        console.log("response",res);
        this.products=res.results;
        this.isLoading=false;
      },
      error=>{
        console.log("error:",error);
      }
    );

  }

  

}
