import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() data;

  query: string;
  requests: any = [];

  constructor() { }

  ngOnInit() {
  }

  refresh() {
    this.data.pagination.page = 1;

    if (this.query) {
      this.data.pagination.search = this.query;
    } else {
      delete this.data.pagination.search;
    }

    let body: any = Object.assign({}, this.data.pagination);
    body.perPage = this.data.pagination.pageSize;
    body.page -= 1;

    delete body.pageSize;
    delete body.total;

    this.data.busy = this.data.search(body).subscribe(
      (doc: any) => {
        this.requests.splice(this.requests.indexOf(this.data.busy), 1);
        this.data.list = doc.data;
        doc.extraData.page = doc.extraData.page + 1;
        Object.assign(this.data.pagination, doc.extraData);
      }
    );

    this.requests.push(this.data.busy);

    if (this.requests.length > 1) {
      this.requests[0].unsubscribe();
      this.requests.splice(0, 1);
    }
  }

}
