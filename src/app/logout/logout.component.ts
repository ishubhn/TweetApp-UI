import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
	username: String;

	constructor(private service: UserService, private router: Router) {
		this.username = String(localStorage.getItem('emailId'));
	}

	ngOnInit(): void {
	}

	logout() {
		this.service.logout(this.username).subscribe(
			res => {
				console.log(res);
				console.log("logout successfull");
				localStorage.clear(); // Remove email id from localStorage memory
				localStorage.setItem('loginStatus', 'false');
				this.router.navigate(['/login']);
			},
			err => {
				console.error("logout");
				console.error(err.error.message);
			}
		);
	}

}
