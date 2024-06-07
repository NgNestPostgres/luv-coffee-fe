import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  constructor(private http: HttpClient) { }

  public healthCheck(): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(`${environment.apiHost}/health`);
  }
}
