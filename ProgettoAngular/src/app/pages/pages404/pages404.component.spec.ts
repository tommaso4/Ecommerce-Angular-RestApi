import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PAGES404Component } from './pages404.component';

describe('PAGES404Component', () => {
  let component: PAGES404Component;
  let fixture: ComponentFixture<PAGES404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PAGES404Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PAGES404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
