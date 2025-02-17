import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMedsListComponent } from './member-meds-list.component';

describe('MemberMedsListComponent', () => {
  let component: MemberMedsListComponent;
  let fixture: ComponentFixture<MemberMedsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberMedsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberMedsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
