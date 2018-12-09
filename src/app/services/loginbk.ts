import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiListModel } from '../models/ApiListModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private encUserPwd: string;
  public headers: Headers;
  public httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Cache-Control', 'no-cache')
    .set('Access-Control-Allow-Origin', '*');

  private url: string = "http://localhost:8080/user/signin";

  constructor(private http: HttpClient) {

  }

  // post.setHeader("Authorization", "Basic " + encodedAuthorization);

  public createAuthHeader(headers: Headers, userName: string, password: string) {
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(userName + ":" + password));
  }

  login(userName: string, password: string): Observable<Object> {

    let headers = new Headers();
    this.createAuthHeader(headers, userName, password);

    let usrPwd = userName + ":" + password;
    this.encUserPwd = "Basic " + btoa(usrPwd);
    console.log(this.encUserPwd);
    // let options = {
    //   headers: this.httpHeaders
    // };
    this.headers.set('Authorization', this.encUserPwd);
    this.httpHeaders.set('Authorization', this.encUserPwd);
    // this.httpHeaders.append('Authorization', this.encUserPwd);
    // return this.http.post(url, data, {headers: headers});
    // return this.http.post(this.url, '', {headers: headers});
    // return this.http.post(this.url,'',{
    //   headers: this.httpHeaders,
    //   observe: 'response'
    //   });

    // return this.http.post<Object>(this.url, '',
    //   {
    //     headers: this.httpHeaders,
    //     observe: 'body',
    //     responseType: 'json'
    //   }
    // );

  }
}
