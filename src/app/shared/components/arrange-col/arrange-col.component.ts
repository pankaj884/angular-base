import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-arrange-col',
  templateUrl: './arrange-col.component.html',
  styleUrls: ['./arrange-col.component.scss']
})
export class ArrangeColComponent implements OnInit {

  currentSort: string;
  @Input() data;
  @Input() nameAttr;

  constructor() {
  }

  ngOnInit() {
  }

  fetch() {
    const body: any = Object.assign({}, this.data.pagination);
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

  flipOrder() {
    this.data.pagination.page = 1;

    if (this.currentSort !== this.data.pagination.sortKey) {
      this.data.pagination.sortOrder = 1;
    } else {
      this.data.pagination.sortOrder = this.data.pagination.sortOrder === 1 ? -1 : 1;
    }

    this.data.pagination.sortKey = this.nameAttr;
    this.currentSort = this.nameAttr;

    this.fetch();
  }
}
