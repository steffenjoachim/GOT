import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PersonDetailDialogComponent } from '../person-detail-dialog/person-detail-dialog.component';


@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})


export class PersonsComponent {

  persons: any[] = [];
  filteredPersons: any[] = [];
  searchTerm = ''; 


  constructor(private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.fetchHouses();
  }


  fetchHouses() {
    this.http.get<any[]>('https://api.gameofthronesquotes.xyz/v1/characters')
      .subscribe(
        (data) => {
          this.persons = data;
          this.filteredPersons = this.persons; 
        },
        (error) => {
          console.error('Fehler beim Laden der Daten:', error);
        }
      );
  }


  filterPersonOrHouses() {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.filteredPersons = this.persons.filter((person) =>
      person.name.toLowerCase().includes(filterValue) ||
      (person.house && person.house.name.toLowerCase().includes(filterValue)) ||
      (!person.house && 'is not associated with any house'.includes(filterValue))
    );
  }  


    openPersonDetailDialogComponent(person: any) {
      this.dialog.open(PersonDetailDialogComponent, {
        data: person,
      });
    }
}