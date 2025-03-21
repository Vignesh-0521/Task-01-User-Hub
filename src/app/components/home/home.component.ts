import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userForm: FormGroup;
  isEditMode = false; 

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({     //creating form instance with validations
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      employeeId: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      occupation: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submitForm() {    //submitting the form
    if (this.userForm.valid) {
      if (this.isEditMode) {
        this.userService.updateUser(this.userForm.value);
        this.isEditMode = false;
      } else {
        this.userService.addUser(this.userForm.value);
      }
      this.router.navigate(['/users']);
    }
  }
  cancelEdit() {      //when cancel is clicked, navigate back to users
    this.router.navigate(['/users']);
  }
}
