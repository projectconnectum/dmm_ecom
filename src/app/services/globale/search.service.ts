import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Disponible dans toute l'application
})
export class SearchService {


    private searchSubject=new BehaviorSubject<string>("");
    searchItem=this.searchSubject.asObservable();

    setSearchItem(item:any){
        this.searchSubject.next(item);

    }
    
 
}
