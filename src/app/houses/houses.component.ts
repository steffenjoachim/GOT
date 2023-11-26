import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { HouseMembersDialogComponent } from '../house-members-dialog/house-members-dialog.component';


@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss']
})


export class HousesComponent implements OnInit {
  houses: any[] = [];
  filteredHouses: any[] = [];
  searchTerm = ''; 


  constructor(private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.fetchHouses();
  }


  fetchHouses() {
    this.http.get<any[]>('https://api.gameofthronesquotes.xyz/v1/houses')
      .subscribe(
        (data) => {
          this.houses = data;
          this.filteredHouses = this.houses; 
        },
        (error) => {
          console.error('Fehler beim Laden der Daten:', error);
        }
      );
  }

  
  filterHouses() {
    const filterValue = this.searchTerm.trim().toLowerCase(); 
    this.filteredHouses = this.houses.filter((house) => house.name.toLowerCase().includes(filterValue));
    }
    

  openHouseMembersDialog(house: any) {
    this.dialog.open(HouseMembersDialogComponent, {
      data: house,
    });
  }
}