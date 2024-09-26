import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'anp-not-found',
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public url!: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.url = this.router.url;
  }
}
