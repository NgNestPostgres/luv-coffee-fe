import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';

interface SearchOption {
  link: string;
  name: string;
}

const OPTIONS: SearchOption[]  = [
  { name: 'Coffees1', link: 'coffees' },
  { name: 'Users1', link: 'users' },
  { name: 'Lib1', link: 'lib' },
];

@Component({
  selector: 'anp-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  public form!: UntypedFormGroup;
  public searchOptions$!: Observable<SearchOption[]>;

  private _searchSubj$ = new Subject<string>();

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this._createForm();
    this._searchSetup();
  }

  public optionSelected(option: SearchOption): void {
    this.router.navigate([option.link]);
  }

  public search(term: string): void {
    this._searchSubj$.next(term);
  }

  private _createForm(): void {
    this.form = this.fb.group({
      search: ['', []],
    });
  }

  private _search(value: string): SearchOption[] {
    const filterValue = value.toLowerCase();

    return OPTIONS.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _searchSetup(): void {
    this.searchOptions$ = this._searchSubj$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((value: string) => {
          if (value.length < 2) {
            return of<SearchOption[]>([]);
          }

          return of<SearchOption[]>(this._search(value));
        })
      );
  }
}
