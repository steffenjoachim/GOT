import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})


export class HouseService {
  houses: any[] = [];
  selectedHouse: any; 


  constructor(private http: HttpClient) {}


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
        console.log('Häuser geladen:', this.houses);
      },
      (error) => {
        console.error('Fehler beim Laden der Häuser:', error);
      }
    );
  }


  setSelectedHouse(house: any) {
    this.selectedHouse = house; 
  }
}