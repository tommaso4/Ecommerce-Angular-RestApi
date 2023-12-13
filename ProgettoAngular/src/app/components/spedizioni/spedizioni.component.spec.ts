import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpedizioniResiComponent } from './spedizioni-resi.component';

describe('SpedizioniResiComponent', () => {
  let component: SpedizioniResiComponent;
  let fixture: ComponentFixture<SpedizioniResiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpedizioniResiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpedizioniResiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
