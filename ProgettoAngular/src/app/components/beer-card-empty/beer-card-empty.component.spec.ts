import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCardEmptyComponent } from './beer-card-empty.component';

describe('BeerCardEmptyComponent', () => {
  let component: BeerCardEmptyComponent;
  let fixture: ComponentFixture<BeerCardEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeerCardEmptyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeerCardEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
