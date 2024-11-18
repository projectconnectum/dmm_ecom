import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "../env/api.env";


@Injectable({
    providedIn: 'root'
  })
  export class TransactionService {
  
    constructor(private http: HttpClient) { }

    header:HttpHeaders=new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      });

    
    // recharges  endpoints
    getAllRecharges():Observable<any>{
        return this.http.get<any>(api.url+'billings/recharges',{headers:this.header});
      };
    
    recharger(data:any):Observable<any>{
        return this.http.post<any>(api.url+'billings/recharges',data,{headers:this.header});
      };

    getWalletAmount():Observable<any>{
        return this.http.get<any>(api.url+'billings/wallets/mine',{headers:this.header});
      };

      

      
    

  }