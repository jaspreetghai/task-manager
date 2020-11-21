import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignUpButtonClicked(email:string, password:string) {
    this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => { 
      console.log(res);
      
      if (res.status === 200) {
        this.router.navigate(['/lists']);
      }
      else {
        alert("User already exists");
        this.router.navigate(['/login']);
      }
    }, (err: HttpErrorResponse) => {
        alert("User already exists, try logging in!");
        this.router.navigate(['/login']);

    }
    );
  }

}
