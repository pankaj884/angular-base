import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private toastrService: ToastrService) {
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }
  }

  email: string;
  busy = false;

  ngOnInit() {
  }

  onSubmit(form) {
    this.busy = true;
    this.auth.forgetPassword({email: this.email}).subscribe(
      data => {
        this.busy = false;
        this.toastrService.success('Reset password instructions has been sent successfully!!');
        form.reset();
      },
      err => {
        this.busy = false;
      }
    );
  }
}
