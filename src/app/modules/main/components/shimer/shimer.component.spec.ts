import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShimerComponent } from './shimer.component';

describe('ShimerComponent', () => {
  let component: ShimerComponent;
  let fixture: ComponentFixture<ShimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShimerComponent]
    });
    fixture = TestBed.createComponent(ShimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
