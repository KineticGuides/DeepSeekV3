import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDayCalendarComponent } from './resource-day-calendar.component';

describe('ResourceDayCalendarComponent', () => {
  let component: ResourceDayCalendarComponent;
  let fixture: ComponentFixture<ResourceDayCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceDayCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceDayCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
