import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  maxSize = 5;
  @Input() data;

  constructor() {
  }

  ngOnInit() {
    this.fetch();

    const fetch = this.fetch.bind(this);
    this.data.refresh = function () {
      fetch();
    };
  }

  pageChange(event) {
    this.data.pagination.page = event;
    this.fetch();
  }

  changePageSize() {
    this.fetch();
  }

  fetch() {
    const body: any = Object.assign({}, this.data.pagination);
    body.sortOrder = body.sortOrder || -1;
    body.sortKey = body.sortKey || 'createdAt';

    body.perPage = this.data.pagination.pageSize;
    body.page -= 1;

    delete body.pageSize;
    delete body.total;

    this.data.busy = this.data.search(body).subscribe(
      (doc: any) => {
        this.data.list = doc.data;
        doc.extraData.page = doc.extraData.page + 1;
        Object.assign(this.data.pagination, doc.extraData);
      }
    );
  }
}
