import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './shared/services/auth-guard.service';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ProfileComponent} from './profile/profile.component';
import {UsersComponent} from './users/users.component';
import {RegisterComponent} from './auth/register/register.component';
import {OrganisationsComponent} from './organisations/organisations.component';
import {StudentsComponent} from './students/students.component';
import {InstituteFacultiesComponent} from './institute-faculties/institute-faculties.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'internal-users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'institute-faculties', component: InstituteFacultiesComponent, canActivate: [AuthGuard]},
  {path: 'students', component: StudentsComponent, canActivate: [AuthGuard]},
  {path: 'organisations', component: OrganisationsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
