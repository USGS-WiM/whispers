import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  loginForm: FormGroup;
  authenticationErrorFlag = false;


  constructor(
    formBuilder: FormBuilder,
    public authenticationService: AuthenticationService,
    public router: Router
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  ngOnInit() {
  }

  onSubmit(formValue: any) {
    console.log(formValue);
    if (sessionStorage.getItem('username')) {
      this.authenticationService.logout();
    }

    this.authenticationService.login(formValue.username, formValue.password)
      .subscribe(
        (user: any) => {
          // this.router.navigateByUrl('home')
        },
        (error) => {
          this.authenticationErrorFlag = true;
        }
      );
  }

  onLogout() {
    this.authenticationService.logout();
  }

}
