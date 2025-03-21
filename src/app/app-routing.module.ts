import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },     //if the path is empty, redirected to home page
  { path: 'home', component: HomeComponent },     //if the path is home, home component is loaded
  { path: 'users', component: UsersComponent },   //if the path is users, users component is loaded
  { path: 'user-detail/:employeeId', component: UserDetailComponent }, //if the path is user employ id, user-detail component is loaded with specific id
  { path: 'edit-user/:employeeId', component: EditUserComponent}    //if the path is user employ id, edit-user component is loaded with specific id to edit the usr data
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
