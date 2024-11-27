import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/globale/modal.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  // for login 
  isLoginDialogVisible: boolean = false; // Propriété locale
  private subscription!: Subscription; // Pour gérer les abonnements
  // for register
  isRegisterDialogVisible: boolean = false; 
  private registersubscription!: Subscription;


  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    // for login
    this.subscription = this.modalService.loginModalVisible$.subscribe(
      (isVisible) => (this.isLoginDialogVisible = isVisible)
    );

    this.registersubscription=this.modalService.registerModalVisible$.subscribe(
      (isVisible) => (this.isRegisterDialogVisible = isVisible)
    );
  }

  closeLoginModal(): void {
    this.modalService.hideLoginModal();
  }
  closeRegisterModal(): void {
    this.modalService.hideRegisterModal();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Évitez les fuites de mémoire
    }
    if (this.registersubscription) {
      this.registersubscription.unsubscribe();
    }
  }
}
