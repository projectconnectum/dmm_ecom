import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user:any=localStorage.getItem("user")!=null?JSON.parse(localStorage.getItem("user")!):null

  constructor(private router: Router,){}

  ngOnInit(): void {

    if(this.user==null){
      this.router.navigate(['/auth/login']);
    }
    
  }



}
