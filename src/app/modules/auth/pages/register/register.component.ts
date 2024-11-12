import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:any={
    "last_name":"",
    "first_name":"",
    "email":"",
    "phone_number":"",
    "password":""
  }

  constructor(private authService:AuthService,private router:Router,private toastService:NgToastService){}


  register(){
    console.log("data",this.user);
    this.authService.register(this.user).subscribe(
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
              detail:"Information non correctes ",
              duration:10000,
              position:"topRight"
          });
      }
    );
  }

}

