import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { TweetService } from './../service/tweet.service';
import { UserService } from './../service/user.service';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { UserData } from './../interface/user-data';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Tweet } from '../interface/tweet';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	faHeartCrack = faHeartCrack;

	@ViewChild('g', { static: false })
	tweetBodyForm: NgForm;

	email: String;
	subscription: any;
	tweetLength: number;

	emptyTweets: boolean = true;
	user: UserData;
	tweets: Tweet[];

	constructor(private userService: UserService, private tweetService: TweetService,
		private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit(): void {

		var loginStatus = String(localStorage.getItem('loginStatus'));
		
		if (loginStatus == 'false' || loginStatus == undefined || loginStatus == null) {
			this.router.navigate(['/login']);
		}

		this.subscription = this.route.params.subscribe(
			params => {
				this.email = params['email'];
			}
		);

		this.userService.findUserById(this.email).subscribe(
			res => {
				this.user = res;
				console.log(this.user);
			},
			err => {
				console.error(err.error.message);
			}
		)

		this.tweetService.getTweetsById(this.email).subscribe(
			res => {
				this.tweets = res;
				console.log("in user search component tweets");
				if (this.tweets.length !== 0) {
					this.emptyTweets = false;
				}
				console.log(this.tweets);
			},
			err => {
				console.error(err.error.message);
				this.emptyTweets = true;
				this.ngOnInit;
			}
		);
	}

	postTweet(g: NgForm) {
		if (this.tweetBodyForm.value.body !== null && this.tweetBodyForm.value.body !== " ") {
			const params = new HttpParams()
				.set('body', this.tweetBodyForm.value.body);

			this.tweetService.postTweet(this.email, params)
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

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
