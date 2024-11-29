import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { GlobaleService } from 'src/app/services/globale.service';
import { ModalService } from 'src/app/services/globale/modal.service';

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

  constructor(private authService:AuthService,private router:Router,private toastService:NgToastService,private modalService:ModalService,
    private globaleService:GlobaleService,
  ){}


  ngOnInit(): void {
    this.getWorldCountry();
  
  }

  

  register(){
    console.log("data",this.user);

    const data={
      "last_name":this.user.last_name,
    "first_name":this.user.first_name,
    "email":this.user.email,
    "phone_number":this.inputSelectedCountry.phoneCode+this.user.phone_number,
    "password":this.user.password

    }

    console.log(data);


    this.authService.register(data).subscribe(
      res=>{
        console.log(res);
        this.authService.setAuthInfo(res);

        this.modalService.hideRegisterModal();
        window.location.reload(); 



        // this.router.navigate(['/main/home']).then(
        //   ()=>{
            
        //   }
        // );
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



  showLoginModal(){
    this.modalService.showLoginModal();
  }

  
  // phone number 
number:any;
world_country:any[]=[];
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

