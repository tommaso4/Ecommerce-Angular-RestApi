import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameFilterComponent } from './name-filter.component';

describe('NameFilterComponent', () => {
  let component: NameFilterComponent;
  let fixture: ComponentFixture<NameFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NameFilterComponent]
    });
    fixture = TestBed.createComponent(NameFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
