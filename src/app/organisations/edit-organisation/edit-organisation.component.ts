import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {ApiRequestService} from '../../shared/services/api-request.service';

@Component({
  selector: 'app-edit-organisation',
  templateUrl: './edit-organisation.component.html',
  styleUrls: ['./edit-organisation.component.scss']
})
export class EditOrganisationComponent implements OnInit {

  @Input() body;
  busy: Subscription;

  constructor(public activeModal: NgbActiveModal, private toastrService: ToastrService, private apiService: ApiRequestService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const body: any = Object.assign({}, this.body);
    delete body._id;

    this.busy = this.apiService.update(`/organisations/${this.body._id}`, body).subscribe(
      (doc: any) => {
        this.toastrService.success('Updated successfully !! ');
        this.activeModal.close(doc.data || doc);
      }
    );
  }
}
