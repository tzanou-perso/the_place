import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'lib-home-search-dialog',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatIconModule,
    NgFor,
  ],
  providers: [],
})
export class HomeSearchComponentDialog implements OnInit {
  myControl = new FormControl('');
  optionsContact: string[] = ['Jon Doe', 'Allan Parsen', 'Lucy Debois'];
  optionsMail: string[] = [
    'Subject: Is there any way',
    'Subject: Meeting at noon',
  ];
  options: string[][] = [this.optionsContact, this.optionsMail];
  filteredOptions: Observable<string[][]> = this.myControl.valueChanges.pipe(
    startWith(''),
    map((value) => this._filter(value || ''))
  );
  constructor(
    public dialogRef: MatDialogRef<HomeSearchComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[][] {
    const filterValue = value.toLowerCase();
    let newOptions = [];
    newOptions[0] = this.optionsContact.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
    newOptions[1] = this.optionsMail.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
    return newOptions;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
