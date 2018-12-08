import { Component, OnInit } from '@angular/core';

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
  // public user=LoginModel{

  // }
  constructor() { }


  ngOnInit() {

  }
  doLogin() {

    console.log("userName" + this.userName);
    console.log("userPassword" + this.userPassword);
  }



  // ngOnInit() {
  //   this.isSignUp=false;
  //   this.isSignIn=true;
  // }

  // doSignUp()
  // {
  //   console.log("****** doSignUp is called *******");
  //   this.isSignUp=true;
  //   this.isSignIn=false;
  // }
  // doSignIn()
  // {
  //   console.log("****** doSignIn is called *******");
  //   this.isSignUp=false;
  //   this.isSignIn=true;
  // }
}
