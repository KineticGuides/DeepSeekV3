import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTestListComponent } from './member-test-list.component';

describe('MemberTestListComponent', () => {
  let component: MemberTestListComponent;
  let fixture: ComponentFixture<MemberTestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberTestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
