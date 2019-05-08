import { Injectable } from '@angular/core';

@Injectable()
export class DataStoreService {

  store: any = {
    state: true
  };

  constructor() { }

  get data() {
    return this.store;
  }
}

