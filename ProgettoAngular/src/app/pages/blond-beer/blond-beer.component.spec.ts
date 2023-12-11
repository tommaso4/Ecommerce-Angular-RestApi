import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlondBeerComponent } from './blond-beer.component';

describe('BlondBeerComponent', () => {
  let component: BlondBeerComponent;
  let fixture: ComponentFixture<BlondBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlondBeerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlondBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
