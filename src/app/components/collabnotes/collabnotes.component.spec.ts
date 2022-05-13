import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabnotesComponent } from './collabnotes.component';

describe('CollabnotesComponent', () => {
  let component: CollabnotesComponent;
  let fixture: ComponentFixture<CollabnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabnotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
