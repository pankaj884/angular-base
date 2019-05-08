import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteFacultiesComponent } from './institute-faculties.component';

describe('InstituteFacultiesComponent', () => {
  let component: InstituteFacultiesComponent;
  let fixture: ComponentFixture<InstituteFacultiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteFacultiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteFacultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
