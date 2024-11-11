import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { api } from "../env/api.env";


@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
  
    constructor(private http: HttpClient) { }

    header:HttpHeaders=new HttpHeaders({
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
      });

      getAll():Observable<any>{
        return this.http.get<any>(api.url+'products');
      };


    getAllPopular():Observable<any>{
        return this.http.get<any>(api.url+'products/popular');
      };

      getLatest():Observable<any>{
        return this.http.get<any>(api.url+'products/latest');
      };
    

    getNextProduct(type:any):Observable<any>{
      if(type=="popular"){
        return this.http.get<any>("https://api.dreammore.co/products/popular?limit=40&offset=40/");
      } else{
        return this.http.get<any>("https://api.dreammore.co/products?limit=40&offset=40/");
      }
        
    }
    getPrecProduct(type:any):Observable<any>{
      if(type=="popular"){
        return this.http.get<any>("https://api.dreammore.co/products/popular?limit=40&offset=40/");
      } else{
        return this.http.get<any>("https://api.dreammore.co/products?limit=40&offset=40/");
      }
    }

    getShopById(id:any):Observable<any>{
      return this.http.get<any>(api.url+'shops/'+id);
  }


  // service pour ecouter la selection d'un produit 


  private selectedProduct = new BehaviorSubject<any>(null);
  private modalStatus = new BehaviorSubject<boolean>(false);

  setSelectedProduct(product: any) {
    this.selectedProduct.next(product);
    this.modalStatus.next(true);
  }

  getSelectedProduct() {
    return this.selectedProduct.asObservable();
  }

  getModalStatus() {
    return this.modalStatus.asObservable();
  }

  closeModal() {
    this.modalStatus.next(false);
  }


  getProduct(id:any,shop_ref:any){
    return this.http.get<any>(api.url+'products/'+shop_ref+'/'+id);
  }


  // get shop product by id 
  getShopProductById(id:any):Observable<any>{
    return this.http.get<any>(api.url+'shops/'+id+'/popular/products');
  }

  // get product By categories 
  getProductByCategories(id:any):Observable<any>{
    const data={
      "query":id,
      "page":1,
      "limit":40
    }
    return this.http.post<any>(api.url+'products/search',data);
  }
    

  }