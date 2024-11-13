import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user:any=localStorage.getItem("user")!=null?JSON.parse(localStorage.getItem("user")!):null

}
