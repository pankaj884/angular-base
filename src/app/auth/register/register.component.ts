import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private toastrService: ToastrService, private route: ActivatedRoute) {
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }
  }

  user: any = {
    userType: 'ORGANISATION_OWNER'
  };
  busy = false;

  ngOnInit() {
  }

  onSubmit() {
    this.busy = true;
    this.auth.register(this.user).subscribe(
      (doc: any) => {
        this.busy = false;
        this.toastrService.success('Your account has been created successfully !!');
        this.router.navigate(['/login'], {relativeTo: this.route});
      },
      err => {
        this.busy = false;
      }
    );
  }
}
