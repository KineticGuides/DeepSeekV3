import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberOrderListComponent } from './member-order-list.component';

describe('MemberOrderListComponent', () => {
  let component: MemberOrderListComponent;
  let fixture: ComponentFixture<MemberOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
