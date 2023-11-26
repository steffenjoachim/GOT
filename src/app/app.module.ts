import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { HouseService } from './house.service';

import { HeaderComponent } from './header/header.component';
import { HousesComponent } from './houses/houses.component';
import { PersonsComponent } from './persons/persons.component';
import { QuotesComponent } from './quotes/quotes.component';
import { HouseMembersDialogComponent } from './house-members-dialog/house-members-dialog.component';
import { PersonDetailDialogComponent } from './person-detail-dialog/person-detail-dialog.component';

const routes: Routes = [
  { path: 'houses', component: HousesComponent },
  { path: 'persons', component: PersonsComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: '', redirectTo: '/houses', pathMatch: 'full' }, 
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HousesComponent,
    PersonsComponent,
    QuotesComponent,
    HouseMembersDialogComponent,
    PersonDetailDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    MatDialogModule,
  ],
  exports: [RouterModule],
  providers: [HouseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
