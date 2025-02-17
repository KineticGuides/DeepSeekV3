import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietexerciseChatbotComponent } from './dietexercise-chatbot.component';

describe('DietexerciseChatbotComponent', () => {
  let component: DietexerciseChatbotComponent;
  let fixture: ComponentFixture<DietexerciseChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietexerciseChatbotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietexerciseChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
