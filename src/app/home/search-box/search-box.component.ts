import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import {
  debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap
} from 'rxjs';

interface SearchOption {
  link: string;
  name: string;
}

const OPTIONS: SearchOption[] = [
  { name: 'Coffees1', link: 'coffees' },
  { name: 'Users1', link: 'users' },
  { name: 'Lib1', link: 'lib' },
];

@Component({
  selector: 'anp-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class SearchBoxComponent implements OnInit {
  public form!: FormGroup;
  public searchOptions$!: Observable<SearchOption[]>;

  private searchSubj$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createForm();
    this.searchSetup();
  }

  public optionSelected(option: SearchOption): void {
    this.router.navigate([option.link]);
  }

  public search(term: string): void {
    this.searchSubj$.next(term);
  }

  private createForm(): void {
    this.form = this.fb.group({
      search: ['', []],
    });
  }

  private searchOptions(value: string): SearchOption[] {
    const filterValue = value.toLowerCase();

    return OPTIONS.filter((option) => option.name.toLowerCase().includes(filterValue));
  }

  private searchSetup(): void {
    this.searchOptions$ = this.searchSubj$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((value: string) => {
          if (value.length < 2) {
            return of<SearchOption[]>([]);
          }

          return of<SearchOption[]>(this.searchOptions(value));
        })
      );
  }
}
