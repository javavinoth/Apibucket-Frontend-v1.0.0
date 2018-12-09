import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiListModel } from '../models/ApiListModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private encUserPwd: string;


  private url: string = "http://localhost:8080/user/signin";

  constructor(private http: HttpClient) {

  }

  createAuthHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa('user-name:password'));
  }


  login(userName: string, password: string): Observable<HttpResponse<string>> {
    let headers = new Headers();
    this.createAuthHeader(headers);
    return this.http.post(this.url, '', { headers: headers },
    );







  }
}
