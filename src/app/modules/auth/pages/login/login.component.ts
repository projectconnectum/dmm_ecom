import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaleService } from 'src/app/services/globale.service';
import { ModalService } from 'src/app/services/globale/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user:any={
    "username":"",
    "password":""
  }

  world_country:any[]=[];
  number:any;

  constructor(private authService:AuthService, private modalService: ModalService,
   
    private router:Router,private toastService:NgToastService,private globaleService:GlobaleService){}
  ngOnInit(): void {
    this.getWorldCountry();
  
  }

  // close login modal 
  closeLoginModal(): void {
    this.modalService.hideLoginModal();
    window.location.reload();
  
  }

  showRegisterModal(){
    this.modalService.showRegisterModal();
  }




  login(){
    const data={
       "username":this.inputSelectedCountry.phoneCode+this.number,
    "password":this.user.password,

    }

    this.authService.login(data).subscribe(
      res=>{
        console.log(res);

        this.authService.setAuthInfo(res);
        this.closeLoginModal();

        // this.router.navigate(['/main/home']).then(
        //   ()=>{
        //     window.location.reload(); 
        //   }
        // );
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

  inputSelectedCountry:any ;
  searchText: string = '';
filteredCountries: any[] = [];

dropdownOpen:boolean=false;


getWorldCountry() {
  this.globaleService.getWorldountry().subscribe(
    (res) => {
      this.world_country = res.map((country: any) => ({
        name: country.name.common,
        flag: country.flags.png, // URL du drapeau
        iso2: country.cca2,
        phoneCode: this.getPhoneCode(country.idd)
      }));
      this.filteredCountries = [...this.world_country]; // Initialisation de la liste filtrée
      this.inputSelectedCountry = this.world_country[0];
    },
    (err) => {
      console.log(err);
      this.toastService.error({ detail: 'Une erreur est survenue', duration: 3000 });
    }
  );
}

// Fonction pour récupérer le code téléphonique
getPhoneCode(idd: any): string {
  if (!idd || !idd.root) return '';
  return idd.suffixes ? `${idd.root}${idd.suffixes[0]}` : idd.root;
}

// Fonction de recherche
filterCountries() {
  console.log("is filtring")
  this.filteredCountries = this.world_country.filter((country: any) =>
    country.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
    country.phoneCode.includes(this.searchText)
  );
}

// Sélection d'un pays
selectCountry(country: any) {
  this.inputSelectedCountry = country;
  this.dropdownOpen = false; // Fermer le dropdown après la sélection
}

// Ouverture/fermeture du dropdown
toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}


}
