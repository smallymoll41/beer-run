import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarResultsComponent } from './bar-results.component';

describe('BarResultsComponent', () => {
  let component: BarResultsComponent;
  let fixture: ComponentFixture<BarResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
