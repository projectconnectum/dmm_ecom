import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Disponible dans toute l'application
})
export class ModalService {
    // for login
  private loginModalVisibleSubject = new BehaviorSubject<boolean>(false);
  loginModalVisible$ = this.loginModalVisibleSubject.asObservable();

  // for register
  private registerModalVisibleSubject = new BehaviorSubject<boolean>(false);
  registerModalVisible$ = this.registerModalVisibleSubject.asObservable();


  // Méthodes pour ouvrir et fermer le modal register
  showLoginModal(): void {
    this.registerModalVisibleSubject.next(false);
    this.loginModalVisibleSubject.next(true);
  }

  hideLoginModal(): void {
    this.loginModalVisibleSubject.next(false);
  }

  // Méthodes pour ouvrir et fermer le modal register
  showRegisterModal(): void {
    this.loginModalVisibleSubject.next(false);
    this.registerModalVisibleSubject.next(true);
  }

  hideRegisterModal(): void {
    this.registerModalVisibleSubject.next(false);
  }
}
