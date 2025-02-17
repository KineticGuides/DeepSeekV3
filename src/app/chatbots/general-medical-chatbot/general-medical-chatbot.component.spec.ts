import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMedicalChatbotComponent } from './general-medical-chatbot.component';

describe('GeneralMedicalChatbotComponent', () => {
  let component: GeneralMedicalChatbotComponent;
  let fixture: ComponentFixture<GeneralMedicalChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralMedicalChatbotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralMedicalChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
