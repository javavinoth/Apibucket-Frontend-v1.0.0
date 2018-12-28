import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { SignUpEntity } from '../models/SignUpEntity';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private api: string = environment.apiUrl;

  private url: string = "http://13.127.244.113:8080/user/signup";
  constructor(private http: HttpClient) {

  }

  signUp(req: SignUpEntity) {

    const body: SignUpEntity = {
      userName: req.userName,
      userPassword: req.userPassword,
      userEmail: req.userEmail
    }
    let reqJson = JSON.stringify(body);
    return this.http.post<SignUpEntity>(this.url, reqJson,
      {
        headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' }),
        observe: "response"

      });
  }
}
