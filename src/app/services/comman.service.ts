import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';
import { environment } from 'src/environments/dev.environment';

@Injectable({
  providedIn: 'root'
})
export class CommanService {

  constructor(private http: HttpClient) {}
  
  getUsers() {
     return this.http
       .get(environment.apiURL + 'billdata')
       .pipe(
        map((users: any) => users['payload']),
        );
  }

  getAccounts() {
     return this.http
       .get(environment.apiURL + 'getaccounts')
       .pipe(
         map((accounts: any) => accounts),
        );
  }
}
