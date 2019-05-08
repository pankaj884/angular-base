import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService, private router: Router, private toastrService: ToastrService) {
    this.user = this.auth.getUser();
  }

  ngOnInit() {
  }

  logout() {
    this.auth.clearCredentials();
    this.toastrService.success('You have successfully logged out!! ');
    this.router.navigateByUrl('');
  }

}
