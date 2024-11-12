import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user:any={
    "username":"",
    "password":""
  }

  constructor(private authService:AuthService, private router:Router,private toastService:NgToastService){}


  login(){
    console.log("data",this.user);
    this.authService.login(this.user).subscribe(
      res=>{
        console.log(res);

        this.authService.setAuthInfo(res);

        this.router.navigate(['/main/home']).then(
          ()=>{
            window.location.reload(); 
          }
        );
      },
      err=>{
        console.log(err);
        this.toastService.error(
          {
              detail:"Incorrect crédential ",
              duration:10000,
              position:"topRight"
          });
      }
    );
  }


}
