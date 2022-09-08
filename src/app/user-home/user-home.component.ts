import { UserService } from '../service/user.service';
import { NgForm, NgModel } from '@angular/forms';
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

	@ViewChild('g', { static: false })
	tweetBody: NgForm;

	users: any = [];
	faMagnifyingGlass = faMagnifyingGlass;
	userName: any;
	text: NgModel;
	tweetLength: number;

	constructor(service: UserService) {
		this.userName = localStorage.getItem("username");
	}

	ngOnInit(): void {
	}

	keyup(text: NgModel) {
		this.tweetLength = 144 - text.value.length;
	}

	//  to Search all users based on user id and route to different page and show particular user page
	searchUser(f: NgForm) {

	}

	postTweet(g: NgForm) {

	}


}
