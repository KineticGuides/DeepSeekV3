import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEncounterListComponent } from './member-encounter-list.component';

describe('MemberEncounterListComponent', () => {
  let component: MemberEncounterListComponent;
  let fixture: ComponentFixture<MemberEncounterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberEncounterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberEncounterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
