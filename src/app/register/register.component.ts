import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../service/user.service'
import { User } from '../interface/user';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

	@ViewChild('f', { static: false }) signupForm: NgForm;
	submitted: boolean = false;
	equalPassword: boolean = true;
	faCalendar = faCalendar;
	errorMessage: any;
	isUserRegisterSuccess: boolean = false;

	user: User = {
		emailId: '',
		firstName: '',
		lastName: '',
		gender: '',
		contactNumber: '',
		dateOfBirth: '',
		password: ''
	};

	constructor(private service: UserService, private router: Router) { }

	ngOnInit() { }

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
		this.user.emailId = String(this.signupForm.value.emailId).toLowerCase();
		this.user.firstName = this.signupForm.value.firstName;
		this.user.lastName = this.signupForm.value.lastName;
		this.user.gender = this.signupForm.value.gender;
		this.user.contactNumber = this.signupForm.value.contactNumber;
		this.user.dateOfBirth = this.parseDate(this.signupForm.value.dateOfBirth);

		// Validation for Password and confirmPassword
		if (this.signupForm.value.password == this.signupForm.value.confirmPassword) {
			console.log("Password and Re-typed password matched successfully");
			this.user.password = this.signupForm.value.password;
			this.equalPassword = true;

			this.service.registerUser(this.user).subscribe(
				responseData => {
					console.log(responseData);
					this.isUserRegisterSuccess = true;
					this.router.navigate(['/login']);						
				},
				err => {
					this.errorMessage = err.error.message;
					window.alert(this.errorMessage);
				});
			this.signupForm.reset();
		} else {
			console.log("Password and Re-typed password did not matched successfully");
			this.equalPassword = false;
		}
	}
}
