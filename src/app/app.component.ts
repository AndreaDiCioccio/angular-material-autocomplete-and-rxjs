import { cities } from './mockdata';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap, } from 'rxjs/operators'

@Component({
    selector: 'app-root',
    template: `
        <input type="text"
            placeholder="Pick one"
            autofocus
            matInput
            [formControl]="myControl"
            [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete">
            <mat-option *ngFor="let city of filteredCities$ | async" [value]="city">
                {{city}}
            </mat-option>
        </mat-autocomplete>
    `,
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    filteredCities$:Observable<string[]>
    myControl = new FormControl('')

    ngOnInit(): void {
        this.filteredCities$ = this.myControl.valueChanges.pipe(
            map( (text:string) => this.filter(text) )
        )
    }

    filter(text:string): string[] {
        return cities.filter( (city:string) => city.toLowerCase().includes(text.toLowerCase()))
    }

}
