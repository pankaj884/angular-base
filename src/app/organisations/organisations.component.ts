import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiRequestService} from '../shared/services/api-request.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from '../shared/components/confirm-dialog/confirm-dialog.component';
import {AddOrganisationComponent} from './add-organisation/add-organisation.component';
import {EditOrganisationComponent} from './edit-organisation/edit-organisation.component';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit, AfterViewChecked {
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
      return apiService.get('/organisations', params);
    };
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  openDeleteDialog(id, index) {
    const data = Object.assign({}, {_id: id, path: `/organisations/${id}`, operation: 'Delete'});
    const modalRef = this.modalService.open(ConfirmDialogComponent, {windowClass: 'modal-sm ml-auto mr-auto mt-10'});
    modalRef.componentInstance.data = data;

    modalRef.result.then((result) => {
      if (result) {
        this.data.list.splice(index, 1);
        this.data.pagination.total -= 1;
      }
    });

  }

  addDialog() {
    const modalRef = this.modalService.open(AddOrganisationComponent, {windowClass: 'modal-md ml-auto mr-auto mt-7'});

    modalRef.result.then((result) => {
      if (result) {
        this.data.list.unshift(result);
        this.data.pagination.total += 1;
      }
    });
  }

  editDialog(item) {
    const data = JSON.parse(JSON.stringify({
      _id: item._id,
      address: item.address,
      organisationName: item.organisationName,
      organisationPhone: item.organisationPhone
    }));

    const modalRef = this.modalService.open(EditOrganisationComponent, {windowClass: 'modal-md ml-auto mr-auto mt-7'});
    modalRef.componentInstance.body = data;

    modalRef.result.then((result) => {
      if (result) {
        Object.assign(item, result);
      }
    });
  }

}

