import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../providers/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit {

  busy: boolean;
  error: boolean;
  done: boolean;

  timeToExpire: Object = {
    timeOut: 15000
  };

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.doVerify(this.route.snapshot.params['token']);
  }

  doVerify(token: string) {
    console.log('Do Verify ', token);
    this.auth.verify_email(token)
      .subscribe((res) => {
        if (res.json().state) {
          this.toastr.success(res.json().msg, 'Thank you', this.timeToExpire);

          localStorage.setItem('token', res.json().token);
          localStorage.setItem('currentUser', JSON.stringify(res.json().user));
        } else {
          this.error = true;
          this.toastr.error(res.json().msg, 'Error', this.timeToExpire);
        }
        this.busy = false;
      });
  }

  sendVerificationEmail(formData) {
    this.busy = true;
    this.auth.send_verification_email(formData.value.email)
      .subscribe((res) => {
        this.busy = false;
        if (res.json().state) {
          this.toastr.success(res.json().msg);
          this.done = true;
        } else {
          this.toastr.error(res.json().msg, 'Error', this.timeToExpire);
        }
      });
  }

}
