import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from '../../services/api-request.service';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() data;
  busy: Subscription;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiRequestService, private toastrService: ToastrService) {
  }

  ngOnInit() {
  }


  confirmFn() {
    if (this.data.operation === 'Delete') {
      this.busy = this.apiService.deleteApi(this.data.path).subscribe((doc: any) => {
        this.toastrService.success('Deleted successfully !!');
        this.activeModal.close(doc.data || true);
      });
    } else {
      this.busy = this.apiService.patchUpdate(this.data.path, this.data.body).subscribe((doc: any) => {
        const msg = this.data.operation === 'ACTIVE' ? 'Approve' : this.data.operation.toLowerCase();
        this.toastrService.success(msg + 'd successfully !!');
        this.activeModal.close(doc.data || true);
      });
    }
  }
}
