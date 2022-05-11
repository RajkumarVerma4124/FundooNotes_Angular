import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashnotesComponent } from './trashnotes.component';

describe('TrashnotesComponent', () => {
  let component: TrashnotesComponent;
  let fixture: ComponentFixture<TrashnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashnotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
