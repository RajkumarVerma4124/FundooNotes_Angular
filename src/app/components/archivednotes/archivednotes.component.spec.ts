import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivednotesComponent } from './archivednotes.component';

describe('ArchivednotesComponent', () => {
  let component: ArchivednotesComponent;
  let fixture: ComponentFixture<ArchivednotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivednotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivednotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
