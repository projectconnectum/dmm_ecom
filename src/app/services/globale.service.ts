import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, retry } from "rxjs";
import { api } from "../env/api.env";


@Injectable({
    providedIn: 'root'
  })
  export class GlobaleService {
  
    constructor(private http: HttpClient) { }

   
  getWorldountry():Observable<any>{
    return this.http.get<any>(`https://restcountries.com/v3.1/all`)
  }




  }