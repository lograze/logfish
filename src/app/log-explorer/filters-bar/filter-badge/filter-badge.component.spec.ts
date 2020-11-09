import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBadgeComponent } from './filter-badge.component';

describe('FilterBadgeComponent', () => {
  let component: FilterBadgeComponent;
  let fixture: ComponentFixture<FilterBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
