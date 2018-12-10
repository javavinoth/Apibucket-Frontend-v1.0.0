import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ApiListModel } from '../models/ApiListModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userName;
  public userPassword;
  public isSignUp: boolean;
  public isSignIn: boolean;

  headers: string[];



  constructor(private _loginService: LoginService) { }


  ngOnInit() {

  }

  
  doLogin() {

    console.log("userName" + this.userName);
    console.log("userPassword" + this.userPassword);
    console.log();
    this._loginService.login(this.userName, this.userPassword)
      .subscribe(response =>{
      console.log(response.status);});
      // .subscribe(resp => {
      //   // display its headers
      //   const keys = resp.headers.keys();
      //   this.headers = keys.map(key =>
      //     `${key}: ${resp.headers.get(key)}`);
      // });
     

  }
}
