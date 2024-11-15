import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shops-detail',
  templateUrl: './shops-detail.component.html',
  styleUrls: ['./shops-detail.component.css']
})
export class ShopsDetailComponent implements OnInit{

  shop_id:any;
  shop:any;
  popular_product:any[]=[];
  lastest_products:any[]=[];

  isLoading:boolean=true;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.shop_id = params['id'];
      console.log("shop_id",this.shop_id);
      
      // get products 
      this.getShop();

      
    });
  }

  constructor(private route:ActivatedRoute,private shopService:ShopService){};

  getShop(){
    this.shopService.getShopById(this.shop_id).subscribe(
      res=>{
        this.shop=res;
        this.isLoading=false;
        
      },
      err=>{
        console.log(err);

      }

    )
  }

  

}
