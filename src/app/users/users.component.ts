import { UserData } from './../interface/user-data';
import { NavigationEnd, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Tweet } from './../interface/tweet';
import { TweetService } from './../service/tweet.service';
import { UserService } from '../service/user.service';
import { NgForm, NgModel } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faEnvelope, faHeartCrack, faMagnifyingGlass, faMobile, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
	someSubscription: any;

	faMagnifyingGlass = faMagnifyingGlass;
	faHeartCrack = faHeartCrack;
	faUser = faUser;
	faEnvelope = faEnvelope;
	faMobile = faMobile;

	userFirstName: any;
	userLastName: any;
	userEmail: any;
	userGender: any;

	users: UserData[];

	emptyUsers: boolean = false;

	constructor(private service: UserService, private router: Router) {
	}

	ngOnInit(): void {
		var loginStatus = String(localStorage.getItem('loginStatus'));
		
		if (loginStatus == 'false' || loginStatus == undefined || loginStatus == null) {
			this.router.navigate(['/login']);
		}
		
		// to Load all tweets at initialization - call rest service getAllTweets
		this.service.findAllUsers().subscribe(
			(res: UserData[]) => {
				this.users = res;
				this.emptyUsers = false;
			},
			(err) => {
				console.log("error -> " + err);
				console.log(err.error.message);
				this.emptyUsers = true;
				this.ngOnInit();
			}
		)

		this.userFirstName = localStorage.getItem("firstName");
		this.userLastName = localStorage.getItem("lastName");
		this.userEmail = localStorage.getItem("emailId");
		this.userGender = localStorage.getItem("gender");
	}
}


