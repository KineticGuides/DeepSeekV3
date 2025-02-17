import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNoteListComponent } from './member-note-list.component';

describe('MemberNoteListComponent', () => {
  let component: MemberNoteListComponent;
  let fixture: ComponentFixture<MemberNoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberNoteListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
