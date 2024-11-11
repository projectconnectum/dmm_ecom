import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api } from "../env/api.env";


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    constructor(private http: HttpClient) { }

    // header:HttpHeaders=new HttpHeaders({
    //     'Authorization': 'Bearer ' + localStorage.getItem("token")
    //   });


    register( data:any){
        return this.http.post<any>(api.url+'auth/register',data)
    }

    login( data:any){
      return this.http.post<any>(api.url+'auth/login',data)
  }

    setAuthInfo(info:any){
        localStorage.setItem("token",info.access_token);
        localStorage.setItem("refresh_token",info.refresh_token);
        localStorage.setItem("user",JSON.stringify(info.user));
        localStorage.setItem("isAuth","true");

    }
    

  }