import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {DataStoreService} from '../../services/data-store.service';
import {AuthService} from '../../../auth/auth.service';
import {ApiRequestService} from '../../services/api-request.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss']
})

export class MainSidebarComponent implements OnInit {

  user: any;
  menuItems = [];

  constructor(private auth: AuthService, private apiService: ApiRequestService,
              private dataProvider: DataStoreService, private changeRef: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit() {
    this.user = this.auth.getUser() || {};
    this.loadSidebarMenu();
  }

  toggleState() {
    this.dataProvider.data.state = !this.dataProvider.data.state;
    this.changeRef.detectChanges();
  }

  isActive(item) {

    if (!item) {return; }

    if (!item.path) {
      let foundActive = false;
      item.submenu.forEach(value => {
        if (this.isActive(value)) {
          foundActive = this.isActive(value);
        }
      });
      return foundActive;
    } else {
      return this.router.url.includes(item.path);
    }
  }

  permissionFilter(item) {
    return this.user.isSuperAdmin || !item.power || (this.user.permission && (this.user.permission[item.power] || {}).index);
  }

  loadSidebarMenu() {
    const menuJson = 'assets/jsons/sidebar-menu.json';
    const menuURL = menuJson + '?v=' + (new Date().getTime()); // jumps cache

    this.apiService.localGet(menuURL, {})
      .subscribe((items: any) => {
        for (const item of items) {
          if (!item.path) {
            item.submenu = item.submenu.filter(this.permissionFilter.bind(this));
            item.submenu.forEach(value => item.isMenuExpanded = this.isActive(value));
          } else if (this.permissionFilter(item)) {
            this.menuItems.push(item);
          }
        }
      });
  }

  getMenuItemPropClasses(item) {
    return (this.isActive(item) ? ' active' : '');
  }

  clickFn(item) {
    if (!item.path) {
      item.isMenuExpanded = !item.isMenuExpanded;
    } else {
      this.menuItems.forEach(innerItem => {
        if (innerItem.isMenuExpanded) {
          innerItem.isMenuExpanded = false;
        }
      });

      this.router.navigateByUrl(item.path);
    }
  }

}

