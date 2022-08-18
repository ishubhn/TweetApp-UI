import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class User {
	emailId: String;
	firstName: String;
	lastName: String;
	gender: String;
	contactNumber: String;
	dateOfBirth: String;
	password: String;
}

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

	@ViewChild('f', { static: false }) signupForm: NgForm;
	submitted: boolean = false;
	equalPassword: boolean = true;

	user: User = {
		emailId: '',
		firstName: '',
		lastName: '',
		gender: '',
		contactNumber: '',
		dateOfBirth: '',
		password: ''
	};

	constructor(private http: HttpClient) { }

	ngOnInit() { }

	// user sign up
	registerUser = (user: User) => {
		this.http.post("http://localhost:8082/api/v1.0/tweets/register", user)
		.subscribe(responseData => {console.log(responseData)});
	}

	// parse date as per dd/mm/yyyy
	parseDate(dateBirth: any) {
		let day = dateBirth.day;
		let month = dateBirth.month;
		let year = dateBirth.year;
		let finalDate: String;

		if (month < 10 && day < 10) {
			finalDate = `0${day}/0${month}/${year}`;
		} else if (month < 10 && day > 9) {
			finalDate = `${day}/0${month}/${year}`;
		} else if (day < 10 && month > 9) {
			finalDate = `0${day}/${month}/${year}`;
		} else {
			finalDate = `${day}/${month}/${year}`;
		}

		return finalDate;
	}

	onSubmit(f: NgForm) {
		this.user.emailId = this.signupForm.value.emailId;
		this.user.firstName = this.signupForm.value.firstName;
		this.user.lastName = this.signupForm.value.lastName;
		this.user.gender = this.signupForm.value.gender;
		this.user.contactNumber = this.signupForm.value.contactNumber;
		this.user.dateOfBirth = this.parseDate(this.signupForm.value.dateOfBirth);

		if (this.signupForm.value.password == this.signupForm.value.confirmPassword) {
			console.log("Password and Re-typed password matched successfully");
			this.user.password = this.signupForm.value.password;
			this.equalPassword = true;
			console.log(this.user);
			this.registerUser(this.user);
			this.signupForm.reset();
		} else {
			console.log("Password and Re-typed password did not matched successfully");
			this.equalPassword = false;
		}
	}
}
