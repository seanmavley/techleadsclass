import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../providers/auth.service';

@Component({
  selector: 'app-not-verified',
  templateUrl: './not-verified.component.html',
})
export class NotVerifiedComponent implements OnInit {

  busy: boolean;
  done = false;

  timeToExpire: Object = {
    timeOut: 15000
  };

  constructor(private router: Router,
    private toastr: ToastrService,
    private auth: AuthenticationService) { }

  ngOnInit() {
  }

  sendVerificationEmail(formData) {
    this.busy = true;
    this.auth.send_verification_email(formData.value.email)
      .subscribe((res) => {
        this.busy = false;
        if (res.json().state) {
          this.toastr.success(res.json().msg);
          console.log(res.json().msg);
          this.done = true;
        } else {
          this.toastr.error(res.json().msg, 'Error', this.timeToExpire);
          console.log(res.json().msg);
        }
      });
  }
}
