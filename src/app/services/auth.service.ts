import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  domain = environment.domain;
  authToken;
  user;
  options;
  policyToken;
  policyOptions;
  auth = { token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0IjoiSW9UIn0.tF1ocmwNmozxfTpsfEc62OfjbYew6qg88RlAS5Q7BOM' };

  constructor(
    private http: Http
  ) { }

  /****** Functions Related to Header and Token ************************************************************************/

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    this.authToken = this.auth.token; // Get token and asssign to variable to be used elsewhere
  }

  create(data) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'bcdb/create', data, this.options).map(res => res.json());
  }

  search(data) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'bcdb/search/' + data.term, this.options).map(res => res.json());
  }

}
