import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureViewComponent } from './structure-view.component';

describe('StructureViewComponent', () => {
  let component: StructureViewComponent;
  let fixture: ComponentFixture<StructureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
