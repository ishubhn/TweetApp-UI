import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

export class LoginUser {
	email: String;
	password: String;
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	@ViewChild('f', { static: false })
	loginForm: NgForm;
	isUserLoginSuccess:boolean = true;

	private user: LoginUser = {
		email: "",
		password: ""
	};

	constructor(private service: UserService, private router: Router) { }

	ngOnInit(): void {
	}

	onSubmit(f: NgForm) {
		this.user.email = this.loginForm.value.email;
		this.user.password = this.loginForm.value.password;
		
		console.log(this.user);
		this.service.loginUser(this.user).subscribe(
			responseData => {
				console.log(responseData);
				console.log(this.user);
				console.log("User Logged in successfully");
				this.router.navigate(['/']);
			},
			err => {
				console.log(this.user);
				this.isUserLoginSuccess = false;
				console.error("Invalid Credentials");
			}
		)
		this.loginForm.reset();
		// console.log(f.value.password);
		// this.user = f.value;
	}

}
