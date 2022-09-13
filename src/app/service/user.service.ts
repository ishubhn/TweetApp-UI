import { UserData } from './../interface/user-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../interface/login-user';
import { UpdateUserPassword } from './../interface/update-user-password';
import { User } from '../interface/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	// private REST_SERVICE_URI = "http://localhost:8082/api/v1.0/tweets"
	private REST_SERVICE_URI = "http://3.109.5.179:8082/api/v1.0/tweets"
	
	constructor(private http: HttpClient) { }

	// user sign up
	registerUser = (user: User) => {
		return this.http.post(`${this.REST_SERVICE_URI}/register`, user);
	}

	// user login
	loginUser = (userCredetials: LoginUser) => {
		return this.http.post(`${this.REST_SERVICE_URI}/login`, userCredetials);
	}

	// forgot password
	forgotPassword = (userEmail: String, user: UpdateUserPassword) => {
		return this.http.post(`${this.REST_SERVICE_URI}/${userEmail}/forgot`, user);
	}

	// find all users
	findAllUsers = () => {
		return this.http.get<UserData[]>(`${this.REST_SERVICE_URI}/users/all`);
	}

	// find user by id
	findUserById = (userEmail: String) => {
		return this.http.get<UserData>(`${this.REST_SERVICE_URI}/user/search/${userEmail}`);
	}

	// logged out
	logout = (userEmail: String) => {
		return this.http.get(`${this.REST_SERVICE_URI}/${userEmail}/logout`);
	}
}
