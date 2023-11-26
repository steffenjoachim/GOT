import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { HouseMembersDialogComponent } from '../house-members-dialog/house-members-dialog.component';
import { HouseService } from '../house.service';


@Component({
  selector: 'app-person-detail-dialog',
  templateUrl: './person-detail-dialog.component.html',
  styleUrls: ['./person-detail-dialog.component.scss']
})


export class PersonDetailDialogComponent {
  displayedQuotes: string[] = [];
  currentPage = 1;
  pageSize = 3; 
  character: any; 
  totalPages: number = 0;
  houses: any[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public person: any,
    private dialogRef: MatDialogRef<PersonDetailDialogComponent>,
    private http: HttpClient,
    private dialog: MatDialog,
    private houseService: HouseService,
  ) {
    if (person.quotes && person.quotes.length > 0) {
      this.displayedQuotes = this.person.quotes.slice(0, this.pageSize);
      this.getPersonQuotes();
    } else {
      this.getCharacterQuotes(this.person.person.name)
    };
    this.getHouses();
  }


  getDisplayedQuotes(): string[] {
    const displayedQuotes = this.person?.quotes || this.character?.quotes || [];
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return displayedQuotes.slice(startIndex, endIndex);
  }


  updateTotalPages(): void {
    const totalQuotes = this.character?.quotes?.length || this.person?.quotes?.length || 0;
    this.totalPages = Math.ceil(totalQuotes / this.pageSize);
  }


  updateQuotes(quotes: string[]): void {
    this.displayedQuotes = quotes.slice(0, this.pageSize);
    this.updateTotalPages();
  }
  

  getCharacterQuotes(characterName: string): void {
    const apiUrl = `https://api.gameofthronesquotes.xyz/v1/characters`;
    this.http.get<any[]>(apiUrl).subscribe(
      (response: any[]) => {
        this.character = response.find((char) => char.name === characterName); 
        if (this.character) {
          if (this.character.quotes) {
            this.updateQuotes(this.character.quotes);
          } 
        } 
      },);
  }
  

  getPersonQuotes(): void {
    const personQuotes = this.person?.quotes || [];
    this.updateQuotes(personQuotes);
  }


  nextPage(event: Event) {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.displayedQuotes = this.getDisplayedQuotes();
    }
    event.stopPropagation();
  }
  

  previousPage(event: Event) {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayedQuotes = this.getDisplayedQuotes();
    }
    event.stopPropagation();
  }


  getHouses(): void {
    const apiUrl = 'https://api.gameofthronesquotes.xyz/v1/houses';
    this.http.get<any[]>(apiUrl).subscribe(
      (response: any[]) => {
        this.houses = response.map(house => ({
          name: house.name,
          members: house.members.map((member: any) => ({
            name: member.name,
            slug: member.slug
          }))
        }));
      },
      (error) => {
        console.error('Fehler beim Laden der Häuser:', error);
      }
    );
  }
  

  openHouseMembersDialog(house: any, event?: Event) {
    this.closeDialog();
    console.log(house)
    if (event) {event.stopPropagation();}
    if (!house || !house.name) {return;}
    const selectedHouse = this.houses.find((h) => h.name === house.name);
    if (selectedHouse) {
      this.handleSelectedHouse(selectedHouse);
    } else {console.error('Das ausgewählte Haus wurde nicht gefunden');}
  }


  private handleSelectedHouse(selectedHouse: any) {
    this.setSelectedHouse(selectedHouse);
    this.dialog.open(HouseMembersDialogComponent, {
      data: {
        house: {
          name: selectedHouse.name,
          members: selectedHouse.members
        }
      },
    });
  }
  
  
  setSelectedHouse(house: any) {
    this.houseService.setSelectedHouse(house);
  }


  getHouseForDialog() {
    return (this.person && this.person.house) ? this.person.house : (this.character && this.character.house);
  }
  

  getHouseNameForDialog() {
    return (this.person && this.person.house) ? this.person.house.name : (this.character && this.character.house.name);
  }


  closeDialog() {
    this.dialogRef.close();
  }
}