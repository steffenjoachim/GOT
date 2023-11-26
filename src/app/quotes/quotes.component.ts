import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})


export class QuotesComponent {
  quotes: any[] = [];
  filteredQuotes: any[] = [];
  searchTerm = ''; 


  constructor(private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.fetchQuotes();
  }


  fetchQuotes() {
    this.http.get<any[]>('https://api.gameofthronesquotes.xyz/v1/random/5')
      .subscribe(
        (data) => {
          this.quotes = data;
          this.filteredQuotes = this.quotes; 
        },
        (error) => {
          console.error('Fehler beim Laden der Daten:', error);
        }
      );
  }
}