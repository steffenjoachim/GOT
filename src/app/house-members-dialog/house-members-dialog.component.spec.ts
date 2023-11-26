import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseMembersDialogComponent } from './house-members-dialog.component';

describe('HouseMembersDialogComponent', () => {
  let component: HouseMembersDialogComponent;
  let fixture: ComponentFixture<HouseMembersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseMembersDialogComponent]
    });
    fixture = TestBed.createComponent(HouseMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
