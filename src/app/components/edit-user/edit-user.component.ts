import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;    //initialising a form group

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({   //creating form instance with validations
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      employeeId: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      occupation: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {    //snapshots the employee id, if id found ,gets the userId, patches the form with foundUser ; else user not found and navigates to users 
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if (employeeId) {
      const foundUser = this.userService.getUserById(employeeId);
      if (foundUser) {
        this.userForm.patchValue(foundUser);
      } else {
        console.error('User not found!');
        this.router.navigate(['/users']);
      }
    }
  }

  saveUser() {    //when save is clicked, this method called and updates and saves the value
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.getRawValue());
      this.router.navigate(['/users']);
    }
  }

  cancelEdit() {      //when cancel is clicked, navigate back to users
    this.router.navigate(['/users']);
  }
}
