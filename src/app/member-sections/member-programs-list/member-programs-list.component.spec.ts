import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProgramsListComponent } from './member-programs-list.component';

describe('MemberProgramsListComponent', () => {
  let component: MemberProgramsListComponent;
  let fixture: ComponentFixture<MemberProgramsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberProgramsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberProgramsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
