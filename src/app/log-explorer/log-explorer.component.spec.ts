import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogExplorerComponent } from './log-explorer.component';

describe('LogExplorerComponent', () => {
  let component: LogExplorerComponent;
  let fixture: ComponentFixture<LogExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
