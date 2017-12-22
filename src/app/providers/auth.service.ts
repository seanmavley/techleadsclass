import { AppSettings } from './constants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {

  getHeaders() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    return headers;
  }

  isLoginSubject = new BehaviorSubject(this.hasToken())
  
  constructor(public http: Http) {  }

  /**
  * Represents new user registration approach.
  * @param {string} fullName Full Name
  * @param {string} email Email Address
  * @param {string} password User password
  * @param {string} username Username
  * @returns {Observable} An HTTP Response Promise object.
  */
  register(fullName: string, email: string, password: string, username: string, captcha: string) {
    const params = {
      fullName: fullName,
      email: email,
      password: password,
      username: username,
      captcha: captcha
    };

    return this.http.post(AppSettings.API_ENDPOINT + '/auth/register', JSON.stringify(params), {headers: this.getHeaders()})
      .map((res) => {
        console.log(res.json());
        return res;
      });
  }

  /**
  * Represents already registered User authentication
  * @param {string} email_username
  * @param {string} password
  * @returns {Observable}
  */
  login(email_username: string, password: string) {
    const params = {
      email_username: email_username,
      password: password
    };

    return this.http.post(AppSettings.API_ENDPOINT + '/auth/login', JSON.stringify(params), {headers: this.getHeaders()})
      .map((res) => {
        localStorage.setItem('token', res.json().token);
        localStorage.setItem('currentUser', JSON.stringify(res.json().user));
        const time_to_login = Date.now() + 604800000; // one week
        localStorage.setItem('timer', JSON.stringify(time_to_login));
        this.isLoginSubject.next(true);
        return res;
      });
  }

  /**
  * Requests a reset password
  * @param email The email address the reset password link should be sent to
  * @returns {Observable}
  */
  reset_password_request(email: string) {
    // console.log(email);
    // console.log(this.getHeaders());
    const params = {
      email: email
    };

    return this.http.post(AppSettings.API_ENDPOINT + '/auth/reset-password-request', JSON.stringify(params), { headers: this.getHeaders() })
      .map((res) => {
        console.log(res.json());
        return res;
      });
  }

  /**
  * Resets a user password
  * @param {string} reset_token The reset token to auth if reseting password allowed
  * @param {string} new_password New password
  * @param {string} verify_password Repeat new password
  * @returns {Observable}
  */
  reset_password(reset_token: string, new_password: string, verify_password: string) {
    const params = {
      'reset_token': reset_token,
      'new_password': new_password,
      'verify_password': verify_password
    };

    return this.http.post(AppSettings.API_ENDPOINT + '/auth/reset-password', JSON.stringify(params), {headers: this.getHeaders()})
      .map((res) => {
        console.log(res.json());
        return res;
      });
  }

  /**
  * Verifies registered user's email
  * @param {string} verify_token The verification token
  * @returns {Observable}
  */
  verify_email(verify_token: string) {
    const params = {
      verify_token: verify_token
    };

    return this.http.post(AppSettings.API_ENDPOINT + '/auth/verify-email', JSON.stringify(params), { headers: this.getHeaders() } )
      .map((res) => {
        return res;
      });
  }

  /**
  * Sends email verification again to this user
  * @param {string} email The email to send verification email to
  * @returns {Observable}
  */
  send_verification_email(email: string) {
    const params = {
      email: email
    };

    return this.http.post(AppSettings.API_ENDPOINT + '/auth/resend-verification', JSON.stringify(params), { headers: this.getHeaders() })
      .map((res) => {
        return res;
      });
  }

  // AUTHENTICATION DETERMINERS

  /**
  * Returns the currently logged in user info
  * @returns {Object} - email, username, fullName
  */
  currentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  /**
  * Determines if user is logged in
  * @returns {Boolean}
  */
  isLoggedIn():Observable<boolean> {
    return this.isLoginSubject.asObservable().share();
  }

  private hasToken():boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  /**
  * Logs currently logged in user out
  * @returns {Boolean}
  */
  logout() {
    localStorage.clear()
    this.isLoginSubject.next(false);
    return true;
  }

}
