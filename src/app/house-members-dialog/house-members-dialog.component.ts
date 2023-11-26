import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,  MatDialog } from '@angular/material/dialog';
import { PersonDetailDialogComponent } from '../person-detail-dialog/person-detail-dialog.component';
import { HouseService } from '../house.service';

@Component({
  selector: 'app-house-members-dialog',
  templateUrl: './house-members-dialog.component.html',
})


export class HouseMembersDialogComponent {
  selectedHouse: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public house: any,
    private dialogRef: MatDialogRef<HouseMembersDialogComponent>,
    private dialog: MatDialog,
    private houseService: HouseService,
  ) {
    this.selectedHouse = this.houseService.selectedHouse;
  }

  
  closeDialog() {
    this.dialogRef.close(); 
  }


  openPersonDetailDialogComponent(member: any) {
    const personData = {
      name: member.name,
      slug: member.slug,
    };
    this.dialog.open(PersonDetailDialogComponent, {
      data: { person: personData },
    });
  }
}