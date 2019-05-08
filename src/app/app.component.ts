import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {DataStoreService} from "./shared/services/data-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(private auth: AuthService, public dataProvider: DataStoreService) {
    this.auth.loggedIn$.subscribe(
      () => {
        this.ngOnInit();
      });
  }

  ngOnInit() {
    this.isLoggedIn = this.auth.isAuthenticated();
  }
}
