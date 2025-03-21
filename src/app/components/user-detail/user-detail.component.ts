import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: any = null;
  employeeId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('employeeId'); // to get ID from URL
    if (this.employeeId) {
      this.user = this.userService.getUserById(this.employeeId);    //get user by id else shows error
      if (!this.user) {
        console.error('User not found!');
      }
    } else {
      console.error('Employee ID is null or undefined');
    }
  }

  goBack() {
    this.router.navigate(['/users']); // to navigate back to Users page
  }
}
