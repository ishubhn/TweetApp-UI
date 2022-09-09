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
	tweetBody: NgForm;
	
	faMagnifyingGlass = faMagnifyingGlass;
	faHeartCrack = faHeartCrack;

	tweets: Tweet[];
	userName: any;
	text: NgModel;
	tweetLength: number;
	emptyTweets: boolean = false;

	constructor(private service: UserService, private tweetService: TweetService) {
		this.userName = localStorage.getItem("username");
	}

	ngOnInit(): void {
		// to Load all tweets at initialization - call rest service getAllTweets
		this.tweetService.getAllTweets().subscribe(
			(responseData: Tweet[]) => {
				console.log(responseData);
				// this.tweets.push(responseData);
				this.tweets = responseData;
				console.log(this.tweets.forEach);
			},
			err => {
				console.log("error -> " + err);
				console.log(err.error.message);
				this.emptyTweets = true;
			}
		);

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
