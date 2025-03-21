import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  editUser(employeeId?: string) {   //method for edit page
    if (!employeeId) return;
    this.router.navigate(['/edit-user', employeeId]); // navigate to the edit page
  }

  deleteUser(employeeId?: string) {   //method to delete a user
    if (!employeeId) return;
    this.userService.deleteUser(employeeId);
    this.users = this.userService.getUsers(); //refreshes the user list
  }

  viewUser(employeeId: string) {      //methhod to view user details
    this.router.navigate(['/user-detail', employeeId]);
  }
}
