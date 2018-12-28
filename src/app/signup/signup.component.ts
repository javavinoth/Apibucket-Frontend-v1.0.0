import { Component, OnInit } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { SignUpEntity } from '../models/SignUpEntity';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformLocation } from '@angular/common';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userName: string;
  userPassword: string;
  userEmail: string;
  userDetails: SignUpEntity;
  responseStatus: number;
  isCreated: boolean;


  // userRequest=new SignUpModel(this.userName,this.userEmail,this.userPassword);
  public isSignUp: boolean;
  returnUrl: string;

  constructor(private _signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router,
    location: PlatformLocation) {
    location.onPopState(() => {
      console.log('pressed back in add!!!!!');
      //this.router.navigateByUrl(‘/multicomponent’);
      //history.forward();
    });

    this.isCreated = false;
    this.userDetails = {
      userName: this.userName,
      userPassword: this.userPassword,
      userEmail: this.userEmail
    }
  }


  ngOnInit() {
    this.isSignUp = false;
    this.returnUrl = this.route.snapshot.queryParams['/home'];
  }


  doSignUp() {

    this._signupService.signUp(this.userDetails)
      .subscribe(response => {
        this.responseStatus = response.status
        if (this.responseStatus == 201) {
          console.log("Response is 201")
          // this.router.navigateByUrl(this.returnUrl);
          this.router.navigate(['home']);
        }
        console.log(response.status);
      });

  }
}
