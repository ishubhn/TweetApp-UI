import { User } from '../register/register.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private REST_SERVICE = "http://localhost:8082/api/v1.0/tweets"

	constructor(private http: HttpClient) { }

	// user sign up
	registerUser = (user: User) => {
		console.warn(`${this.REST_SERVICE}/register`);
		return this.http.post(`${this.REST_SERVICE}/register`, user);
	}
}
