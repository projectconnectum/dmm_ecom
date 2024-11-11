import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "../env/api.env";


@Injectable({
    providedIn: 'root'
  })
  export class ShopService {
  
    constructor(private http: HttpClient) { }

    // header:HttpHeaders=new HttpHeaders({
    //     'Authorization': 'Bearer ' + localStorage.getItem("token")
    //   });


    getAll():Observable<any>{
        return this.http.get<any>(api.url+'shops');
      };

      getShopById(id:any):Observable<any>{
        return this.http.get<any>(api.url+'shops/'+id);
      };

      getShopProduct(id:any):Observable<any>{
        return this.http.get<any>(api.url+'shops/'+id+'/popular/products');
      };
    

  }