import { UserService } from '../service/user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-user-home',
	templateUrl: './user-home.component.html',
	styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

	@ViewChild('f', { static: false })
	searchUsersForm: NgForm;
	users: any = [];
	faMagnifyingGlass = faMagnifyingGlass;
	userName: any;

	constructor(service: UserService) { 
		this.userName = localStorage.getItem("username");
	}

	ngOnInit(): void {
	}

	//  to Search all users based on user id and route to different page and show particular user page
	onSubmit(f: NgForm) { }


}
