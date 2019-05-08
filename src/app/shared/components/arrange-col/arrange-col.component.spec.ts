import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangeColComponent } from './arrange-col.component';

describe('ArrangeColComponent', () => {
  let component: ArrangeColComponent;
  let fixture: ComponentFixture<ArrangeColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrangeColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrangeColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
