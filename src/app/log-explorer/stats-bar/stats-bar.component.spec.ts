import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBarComponent } from './stats-bar.component';

describe('StatsBarComponent', () => {
  let component: StatsBarComponent;
  let fixture: ComponentFixture<StatsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
