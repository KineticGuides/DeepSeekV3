import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateHomeComponent } from './template-home.component';

describe('TemplateHomeComponent', () => {
  let component: TemplateHomeComponent;
  let fixture: ComponentFixture<TemplateHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
