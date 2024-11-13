import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsDetailComponent } from './shops-detail.component';

describe('ShopsDetailComponent', () => {
  let component: ShopsDetailComponent;
  let fixture: ComponentFixture<ShopsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopsDetailComponent]
    });
    fixture = TestBed.createComponent(ShopsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
