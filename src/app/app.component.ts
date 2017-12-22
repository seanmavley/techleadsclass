import { Component } from '@angular/core';
import { AuthenticationService } from './providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  isLoggedIn;

  constructor(private auth: AuthenticationService, private router: Router) { }
  
  ngOnInit() {
    this.auth.isLoggedIn()
      .subscribe((val) => {
        this.isLoggedIn = val;
      })
  }

  logout() {
    this.auth.logout();
    this.auth.isLoggedIn()
      .subscribe((val) => {
        this.isLoggedIn = val;
      })
    this.router.navigate(['/auth']);
  }
}
