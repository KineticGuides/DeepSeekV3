import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongevityChatbotComponent } from './longevity-chatbot.component';

describe('LongevityChatbotComponent', () => {
  let component: LongevityChatbotComponent;
  let fixture: ComponentFixture<LongevityChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongevityChatbotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongevityChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
