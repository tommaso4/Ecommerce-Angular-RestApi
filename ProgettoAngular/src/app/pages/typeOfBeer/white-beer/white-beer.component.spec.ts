import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteBeerComponent } from './white-beer.component';

describe('WhiteBeerComponent', () => {
  let component: WhiteBeerComponent;
  let fixture: ComponentFixture<WhiteBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhiteBeerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhiteBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
