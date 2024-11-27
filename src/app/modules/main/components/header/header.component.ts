import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { ModalService } from 'src/app/services/globale/modal.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  categories:any[]=[];

  user:any=localStorage.getItem("user")!=null?JSON.parse(localStorage.getItem("user")!):null

  constructor(private categorieService:CategorieService, private productService:ProductService, 
    private router:Router,private modalService: ModalService
  ){}

  ngOnInit(): void {
    this.getAllCat();
  }


  getAllCat(){
    this.categorieService.getAll().subscribe(
      res=>{
        console.log(res);
        this.categories=res.results;
      },
      err=>{
        console.log(err);
        
      }
    )
  }

products=[]

  getProductByCat(id:any){
    this.productService.getProductByCategories(id).subscribe(
      res=>{
        console.log("Product cat",res);
      },
      err=>{
        console.log(err);
      }
    );
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/main/home']).then(
      ()=>{
        window.location.reload();
      }
    )

  }

  // show cat widget 
  show_widget:boolean=true ;

  showCat(){
    this.show_widget=!this.show_widget;
  }

  // open loging modal 
  openLoginModal(): void {
    this.modalService.showLoginModal();
  }

  //click in profile
  clickProfile(){
    if(this.user!=null){
      this.router.navigate(['/main/profile']).then(
        ()=>{
          window.location.reload();
        }
      );
    }else{
      this.openLoginModal();
    }
  }
 

}
