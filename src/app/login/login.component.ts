import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  responseStatus: number;
  returnUrl: string;
  headers: string[];
  public isValid: boolean = false;


 
     constructor(private _loginService: LoginService,
      private route: ActivatedRoute,location: PlatformLocation, private router: Router) {
      location.onPopState(() => {
      console.log('pressed back in add!!!!!');
      //this.router.navigateByUrl(‘/multicomponent’);
      //history.forward();
      });
    }
  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['/home'];
  }


  private handleError1(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log('client side error', errorResponse.error.message)
    }
    else {
      console.log('server side error', errorResponse)
      if (errorResponse.status == 401) {
        this.isValid = true;

      }
    }
  }

doLogin(): boolean {

    console.log("userName" + this.email);
    console.log("userPassword" + this.password);
    console.log();
    this._loginService.login(this.email, this.password)
      .subscribe(response => {
        console.log('******* response ******')
        this.responseStatus = response.status;
        if (this.responseStatus == 200) {
          console.log("Response is 200")

          this.router.navigate(['home']);
        }
        console.log(response.status);
      },
        error => { this.isValid=true
          return true });
        return false
  }

  
}
