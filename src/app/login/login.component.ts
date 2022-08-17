import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	private user: any;

	constructor() { }

	ngOnInit(): void {
	}

	onSubmit(f: NgForm) {
		console.log(f.value);
		// console.log(f.value.password);
		// this.user = f.value;
	}

}
