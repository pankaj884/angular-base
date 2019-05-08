import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {ApiRequestService} from '../shared/services/api-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiRequestService) {
  }

  ngOnInit() {
  }

}
