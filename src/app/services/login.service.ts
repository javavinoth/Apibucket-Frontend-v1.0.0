import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiListModel } from '../models/ApiListModel';
import { LoginComponent } from '../login/login.component';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private encUserPwd: string;

  public inValid:boolean=false;

  private api: string = environment.apiUrl;
  

  private url: string = "http://13.127.244.113:8080/user/signin";

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
    return this.http.post(this.url, {},
      {
        headers: new HttpHeaders({ 'Authorization': enUserPwd, 'Accept': 'application/json' }),
        observe: "response"

      }).pipe(catchError(this.handleError));



  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.inValid=true
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.inValid=true
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}




