import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard1Component } from './product-card1.component';

describe('ProductCard1Component', () => {
  let component: ProductCard1Component;
  let fixture: ComponentFixture<ProductCard1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCard1Component]
    });
    fixture = TestBed.createComponent(ProductCard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
