import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/index';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ApiRequestService} from '../../shared/services/api-request.service';

@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.scss']
})
export class AddOrganisationComponent implements OnInit {

  body: any = {};
  busy: Subscription;

  constructor(public activeModal: NgbActiveModal, private toastrService: ToastrService, private apiService: ApiRequestService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.busy = this.apiService.create('/organisations', this.body).subscribe(
      (doc: any) => {
        this.toastrService.success('Created successfully !! ');
        this.activeModal.close(doc.data || doc);
      }
    );
  }
}
