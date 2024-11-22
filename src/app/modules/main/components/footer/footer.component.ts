import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  categories:any[]=[];

  user:any=localStorage.getItem("user")!=null?JSON.parse(localStorage.getItem("user")!):null

  constructor(private categorieService:CategorieService,  
  ){}

  ngOnInit(): void {
    this.getAllCat();
  }

  getAllCat(){
    this.categorieService.getAll().subscribe(
      res=>{
       
        this.categories=res.results;
      },
      err=>{
        console.log(err);
        
      }
    )
  }

}
