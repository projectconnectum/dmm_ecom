import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit{

  shops: any[]=[];
  isLoading: boolean = true;
  constructor(private shopService:ShopService){
  }
  
  ngOnInit(): void {
    this.getAllShops();
  }

  getAllShops(){
    this.shopService.getAll().subscribe(
      res=>{
        this.shops=res.results;
        this.isLoading=false;
      },
      err=>{
        console.log(err);
      }
    )
  }


  



}

