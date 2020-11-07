import { cities } from './mockdata';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, of, iif, from, concat } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators'

@Component({
    selector: 'app-root',
    template: `
        <input type="text"
            placeholder="Pick one"
            matInput
            [formControl]="myControl"
            [matAutocomplete]="auto"
            (input)="filter($event)">
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
            tap( text => console.log('tap text', text) ),
            map( (text:string) => this.filter(text) )
        )
    }

    filter(text:string): string[] {
        console.log('filter text', text)
        return cities.filter( (city:string) => city.toLowerCase().includes(text.toLowerCase()))
    }

}
