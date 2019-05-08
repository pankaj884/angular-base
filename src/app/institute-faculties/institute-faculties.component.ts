import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from '../shared/components/confirm-dialog/confirm-dialog.component';
import {ApiRequestService} from '../shared/services/api-request.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-institute-faculties',
  templateUrl: './institute-faculties.component.html',
  styleUrls: ['./institute-faculties.component.scss']
})
export class InstituteFacultiesComponent implements OnInit, AfterViewChecked {

  data: any = {
    pagination: {
      page: 1,
      pageSize: 25
    },
    list: [],
    busy: Subscription
  };

  constructor(private cdRef: ChangeDetectorRef, private apiService: ApiRequestService, private modalService: NgbModal) {
    this.data.search = function (params) {
      return apiService.get('/users', params);
    };
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  openStatusDialog(item, operation) {
    const data = Object.assign({}, {
      _id: item._id,
      path: `/users/${item._id}/status`,
      operation: operation,
      actionLabel: operation === 'HOLD' ? 'Block' : operation === 'ACTIVE' ? 'Make Active' :
        operation === 'DECLINED' ? 'DECLINE' : operation,
      body: {status: operation}
    });
    const modalRef = this.modalService.open(ConfirmDialogComponent, {windowClass: 'modal-sm ml-auto mr-auto mt-10'});
    modalRef.componentInstance.data = data;

    modalRef.result.then((result) => {
      if (result) {
        Object.assign(item, {status: result.status});
      }
    });
  }
}
