import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../register/register.component';
import { LoginUser } from '../login/login.component';
import { UpdateUser } from '../forgot-password/forgot-password.component';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private REST_SERVICE_URI = "http://localhost:8082/api/v1.0/tweets"

	constructor(private http: HttpClient) { }

	// user sign up
	registerUser = (user: User) => {
		console.warn(`${this.REST_SERVICE_URI}/register`);
		return this.http.post(`${this.REST_SERVICE_URI}/register`, user);
	}

	// user login
	loginUser = (userCredetials: LoginUser) => {
		return this.http.post(`${this.REST_SERVICE_URI}/login`, userCredetials);
	}

	// forgot password
	forgotPassword = (userEmail: String, user: UpdateUser) => {
		return this.http.post(`${this.REST_SERVICE_URI}/${userEmail}/forgot`, user);
	}
}
