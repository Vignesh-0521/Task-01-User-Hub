import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageKey = 'users';   //all the data is stored under the users and it is used to store and retrieve the data 

  constructor() {}

  getUsers() {        //to get all users
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }
  
  getUserById(employeeId: string) {     // to get single user by ID
    const users = this.getUsers();
    return users.find((user: any) => user.employeeId === employeeId);
  }

  addUser(user: any) {      // to add a new user
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  updateUser(updatedUser: any) {      // to update an existing user
    let users = this.getUsers();
    users = users.map((user: any) =>
      user.employeeId === updatedUser.employeeId ? updatedUser : user
    );
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  
  deleteUser(employeeId: string) {      // to delete a user
    let users = this.getUsers();
    users = users.filter((user: any) => user.employeeId !== employeeId);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}
