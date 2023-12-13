import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedBeerComponent } from './red-beer.component';

describe('RedBeerComponent', () => {
  let component: RedBeerComponent;
  let fixture: ComponentFixture<RedBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedBeerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
