import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleResourceCalendarComponent } from './single-resource-calendar.component';

describe('SingleResourceCalendarComponent', () => {
  let component: SingleResourceCalendarComponent;
  let fixture: ComponentFixture<SingleResourceCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleResourceCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleResourceCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
