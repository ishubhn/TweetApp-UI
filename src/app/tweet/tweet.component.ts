import { Tweet } from './../interface/tweet';
import { UserData } from './../interface/user-data';
import { TweetService } from './../service/tweet.service';
import { UserService } from './../service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { UserHomeComponent } from '../user-home/user-home.component';

@Component({
	selector: 'app-tweet',
	templateUrl: './tweet.component.html',
	styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
	// Initialization
	faTwitter = faTwitter;
	faRetweet = faRetweet;
	faLike = faHeart;
	faLikeEmpty = farHeart;
	likeClass: string;
	retweetClass: string;
	user: any;

	@Input()
	tweet: Tweet;

	constructor(private service: UserService, private tweetService: TweetService, private parent: UserHomeComponent) { }

	ngOnInit(): void {
		this.service.findUserById(this.tweet.email).subscribe(
			(response) => {
				this.user = response;
			}
		);
		console.log("in tweet component");

		console.log(this.user);
	}

	addLike() {
		this.tweetService.likeTweet(this.tweet.email, this.tweet.id).subscribe(
			(res) => {
				console.log("like added");
				// this.tweet = res;
				this.parent.refreshPage();
			}
		);
	}

}
