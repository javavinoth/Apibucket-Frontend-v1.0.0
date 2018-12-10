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

  // createAuthHeader(headers: Headers, userName: string, password: string) {
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', 'Basic ' + btoa(userName: password));
  // }


  login(userName: string, password: string): Observable<any> {
    let headers = new Headers();

    let enUserPwd = 'Basic ' + btoa(userName + ':' + password);
    // headers.set('Authorization', enUserPwd);

    // return this.http.post(this.url, {}, { headers: new Headers(){
    //   'Authorization': enUserPwd
    // });

    // return this.http.post(this.url, {},
    //   {
    //     headers: new HttpHeaders({'Authorization': enUserPwd, 'Accept': 'application/json'};{ observe: 'response' }
    //   }
    //   );
    return this.http.post(this.url,{},
      { headers: new HttpHeaders({ 'Authorization': enUserPwd, 'Accept': 'application/json' }),
      observe: "response"
      
  });

  }
}




