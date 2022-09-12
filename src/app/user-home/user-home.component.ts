import { NavigationEnd, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Tweet } from './../interface/tweet';
import { TweetService } from './../service/tweet.service';
import { UserService } from '../service/user.service';
import { NgForm, NgModel } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faHeartCrack, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-user-home',
	templateUrl: './user-home.component.html',
	styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

	@ViewChild('f', { static: false })
	searchUsersForm: NgForm;

	@ViewChild('g', { static: false })
	tweetBodyForm: NgForm;
	someSubscription: any;

	faMagnifyingGlass = faMagnifyingGlass;
	faHeartCrack = faHeartCrack;

	tweets: Tweet[];
	userFirstName: any;
	userLastName: any;
	userEmail: any;
	userGender: any;
	text: NgModel;
	tweetLength: number;
	emptyTweets: boolean = false;

	constructor(private service: UserService, private tweetService: TweetService, private router: Router) {
	}

	ngOnInit(): void {
		var loginStatus = String(localStorage.getItem('loginStatus'));
		
		if (loginStatus == 'false' || loginStatus == undefined || loginStatus == null) {
			this.router.navigate(['/login']);
		}

		// to Load all tweets at initialization - call rest service getAllTweets
		this.tweetService.getAllTweets().subscribe(
			(responseData: Tweet[]) => {
				console.log(responseData);
				this.tweets = responseData;
				this.emptyTweets = false;
			},
			err => {
				console.log("error -> " + err);
				console.log(err.error.message);
				this.emptyTweets = true;
				this.ngOnInit();
			}
		);

		this.userFirstName = localStorage.getItem("firstName");
		this.userLastName = localStorage.getItem("lastName");
		this.userEmail = localStorage.getItem("emailId");
		this.userGender = localStorage.getItem("gender");
	}

	keyup(text: NgModel) {
		this.tweetLength = 144 - text.value.length;
	}

	//  to Search all users based on user id and route to different page and show particular user page
	searchUser(f: NgForm) {
		var email = String(this.searchUsersForm.value.email).toLowerCase();
		this.router.navigate(['/user/search', email]);
	}

	// goToProductDetails(id) {
	// 	this.router.navigate(['/product-details', id]);
	//   }

	postTweet(g: NgForm) {
		if (this.tweetBodyForm.value.body !== null && this.tweetBodyForm.value.body !== " ") {
			const params = new HttpParams()
				.set('body', this.tweetBodyForm.value.body);

			this.tweetService.postTweet(this.userEmail, params)
				.subscribe(
					response => {
						console.log("Tweet posted successfully");
						console.warn(response);
						this.updatePage();
						this.tweetLength = 144;
					},
					err => {
						this.ngOnInit();
						console.error("Unable to post tweet");
						console.warn(err.error.message);
						console.warn(err.error);
					}
				);
		} else {
			console.error("Invalid tweet Content. Null Value");
		}
	}

	refreshPage() {
		this.ngOnInit();
	}

	// refresh component
	updatePage() {
		let currentUrl = this.router.url;
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.onSameUrlNavigation = 'reload';
		this.router.navigate([currentUrl]);
	}
}
