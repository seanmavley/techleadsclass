import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../providers/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Title, Meta } from '@angular/platform-browser';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
})
export class LoginRegisterComponent implements OnInit {

  continue: string;
  busy: boolean;
  registered: boolean;

  email_username: string;
  password: string;

  captcha_response: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private meta: Meta,
    private pageTitle: Title) { }

  ngOnInit() {

    if(this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.continue = this.route.snapshot.queryParams['continue'] || '/';

    var hash = window.location.hash;
    hash && $('ul.nav a[href="' + hash + '"]').tab('show');

    $('.nav-tabs a').click(function(e) {
        $(this).tab('show');
        window.location.hash = this.hash;
    });
  }

  login(formData) {
    if (formData.value.email_username && formData.value.password) {
      // console.log(formData.value);
      this.busy = true;
      this.auth.login(formData.value.email_username, formData.value.password)
        .subscribe((res) => {
          this.busy = false;
          if (res.json().state) {
            if(!res.json().email_verified) {
              this.toastr.info(res.json().msg);
              this.auth.logout();
              this.router.navigate(['/auth/not-verified']);
            } else {
              this.router.navigate([this.continue]);
            }
          } else {
            console.log('this was run');
            this.toastr.info(res.json().msg);
            this.auth.logout();
          }
        }, error => {
          this.busy = false;
          // console.log(error.json());
          if (error.json().msg) {
            // console.log(error.json().msg);
            this.toastr.error(error.json().msg);
          } else {
            // console.log('Could not make the request. Please try again.');
            this.toastr.error('Could not make the request. Please try again.');
          }
        });
      } else {
        this.toastr.error('Please fill the form to completion.');
      }
  }

  resolved(captchaResponse: string) {
    // console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.captcha_response = captchaResponse;
  }

  register(formData) {
    this.busy = true;
    // console.log(formData.value);
    this.auth.register(
      formData.value.fullName,
      formData.value.email,
      formData.value.password,
      formData.value.username,
      this.captcha_response)
      .subscribe(res => {
        this.busy = false;
        // console.log(res.json());
        if (res.json().state) {
          this.registered = true;
          // console.log(res.json().msg);
          this.toastr.success('Registration Successful. Follow the instructions in your email to proceed');
        } else {
          // console.log('Try again. Error occured');
          this.toastr.error('Try again. Error occured', res.json().msg);
        }
      }, err => {
        this.busy = false;
        // console.log(err.json().msg);
        if (err.json().msg) {
          // console.log(err.json().msg);
          this.toastr.error(err.json().msg, 'Something is wrong', { timeOut: 15000 });
        } else {
          // console.log('Could not make the request. Please try again.');
          this.toastr.error('Could not make the request. Please try again.');
        }
      });
  }
}
