import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "../env/api.env";


@Injectable({
    providedIn: 'root'
  })
  export class CategorieService {
  
    constructor(private http: HttpClient) { }

    // header:HttpHeaders=new HttpHeaders({
    //     'Authorization': 'Bearer ' + localStorage.getItem("token")
    //   });


    getAll():Observable<any>{
        return this.http.get<any>(api.url+'categories');
      };

    

  }