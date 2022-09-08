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
		this.username = String(localStorage.getItem('username'));
	}

	ngOnInit(): void {
	}

	
	logout() {
		this.service.logout(this.username);
		this.router.navigate(['/login']);
		localStorage.removeItem('username');	// Remove email id from localStorage memory
	}

}
