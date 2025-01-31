import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableItemFormComponent } from './table-item-form.component';

describe('TableItemFormComponent', () => {
  let component: TableItemFormComponent;
  let fixture: ComponentFixture<TableItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableItemFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
