import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMainCardComponent } from './product-main-card.component';

describe('ProductMainCardComponent', () => {
  let component: ProductMainCardComponent;
  let fixture: ComponentFixture<ProductMainCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductMainCardComponent]
    });
    fixture = TestBed.createComponent(ProductMainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
