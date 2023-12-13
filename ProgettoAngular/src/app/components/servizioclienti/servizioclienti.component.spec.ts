import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServizioClientiComponent } from './servizio-clienti.component';

describe('ServizioClientiComponent', () => {
  let component: ServizioClientiComponent;
  let fixture: ComponentFixture<ServizioClientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServizioClientiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServizioClientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
