import { LoginUser } from './../interface/login-user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { timer } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	@ViewChild('f', { static: false })
	loginForm: NgForm;
	isUserLoginSuccess: boolean = true;
	subscription: any;

	private user: LoginUser = {
		email: "",
		password: ""
	};

	loggedInUserData: any;

	constructor(private service: UserService, private router: Router) { }

	ngOnInit(): void {
	}

	getLoggedInUserData(email: String) {
		this.service.findUserById(email)
			.subscribe(
				(response) => {
					this.loggedInUserData = response;
					console.log(response);
					// Store username in local storage in browser
					localStorage.setItem("emailId", String(this.loggedInUserData.emailId).toLowerCase());
					localStorage.setItem("firstName", String(this.loggedInUserData.firstName));
					localStorage.setItem("lastName", String(this.loggedInUserData.lastName));
					localStorage.setItem("gender", String(this.loggedInUserData.gender));
					localStorage.setItem('loginStatus', 'true');
				},
				(err) => {
					err = err.error.message;
					console.error(err);
				}
			)
	}

	onSubmit(f: NgForm) {
		this.user.email = String(this.loginForm.value.email).toLowerCase();
		this.user.password = this.loginForm.value.password;

		console.log(this.user);
		this.service.loginUser(this.user).subscribe(
			responseData => {
				console.log(responseData);
				console.log(this.user);
				console.log("User Logged in successfully");
				// make a get call find user by email, save response data in local storage
				this.getLoggedInUserData(this.user.email);
				this.wait(1500);
			},
			err => {
				console.log(this.user);
				console.log(err.error.message);
				this.isUserLoginSuccess = false;
				console.error("Invalid Credentials");
			}
		)
		this.loginForm.reset();
	}

	// takes time to store data in localStorage, so added timer
	wait = (delay: number) => {
        this.subscription = timer(delay).subscribe(() => {
            this.router.navigate(['/user']);
        })
    };
}
