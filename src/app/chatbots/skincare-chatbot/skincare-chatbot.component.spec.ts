import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkincareChatbotComponent } from './skincare-chatbot.component';

describe('SkincareChatbotComponent', () => {
  let component: SkincareChatbotComponent;
  let fixture: ComponentFixture<SkincareChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkincareChatbotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkincareChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
