import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {JwtHttpInterceptor} from './jwt-http-interceptor';
import {LoginComponent} from './auth/login/login.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './shared/services/auth-guard.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './home/home.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainSidebarComponent} from './shared/components/main-sidebar/main-sidebar.component';
import {DataStoreService} from './shared/services/data-store.service';
import {ApiRequestService} from './shared/services/api-request.service';
import {ProfileComponent} from './profile/profile.component';
import {UsersComponent} from './users/users.component';
import {PaginationComponent} from './shared/components/pagination/pagination.component';
import {ArrangeColComponent} from './shared/components/arrange-col/arrange-col.component';
import {BusyModule} from 'angular2-busy';
import {ConfirmDialogComponent} from './shared/components/confirm-dialog/confirm-dialog.component';
import {SearchComponent} from './shared/components/search/search.component';
import {RegisterComponent} from './auth/register/register.component';
import {OrganisationsComponent} from './organisations/organisations.component';
import {InstituteFacultiesComponent} from './institute-faculties/institute-faculties.component';
import {StudentsComponent} from './students/students.component';
import {AvatarModule} from 'ngx-avatar';
import {MomentModule} from 'ngx-moment';
import {AddOrganisationComponent} from './organisations/add-organisation/add-organisation.component';
import {EditOrganisationComponent} from './organisations/edit-organisation/edit-organisation.component';
import {AddFacultyComponent} from './institute-faculties/add-faculty/add-faculty.component';
import {AddStudentComponent} from './students/add-student/add-student.component';

export function tokenGetter() {
  return (JSON.parse(localStorage.getItem('globals')) || {}).accessToken;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    MainSidebarComponent,
    ProfileComponent,
    UsersComponent,
    PaginationComponent,
    ArrangeColComponent,
    ConfirmDialogComponent,
    SearchComponent,
    RegisterComponent,
    OrganisationsComponent,
    InstituteFacultiesComponent,
    StudentsComponent,
    AddOrganisationComponent,
    EditOrganisationComponent,
    AddFacultyComponent,
    AddStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BusyModule,
    AvatarModule,
    MomentModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://localhost:4200']
      }
    }),
    ToastrModule.forRoot(),
    NgbModule.forRoot()
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AddOrganisationComponent,
    EditOrganisationComponent
  ],
  providers: [
    ApiRequestService,
    AuthService,
    AuthGuard,
    ToastrService,
    DataStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
