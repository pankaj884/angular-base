import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private toastrService: ToastrService, private route: ActivatedRoute) {
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }
  }

  user: any = {};
  busy = false;

  ngOnInit() {
  }

  onSubmit() {
    this.busy = true;
    this.auth.login(this.user).subscribe(
      (doc: any) => {
        this.busy = false;
        this.auth.setCredentials(doc.data || doc);
        this.toastrService.success('You have successfully logged in !! ');
        this.router.navigate(['/home'], {relativeTo: this.route});
      },
      err => {
        this.busy = false;
      }
    );
  }
}
