import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableItemListComponent } from './table-item-list.component';

describe('TableItemListComponent', () => {
  let component: TableItemListComponent;
  let fixture: ComponentFixture<TableItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
