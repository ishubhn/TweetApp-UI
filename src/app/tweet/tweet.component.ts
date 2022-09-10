import { UserData } from './../interface/user-data';
import { TweetService } from './../service/tweet.service';
import { UserService } from './../service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { Tweet } from '../interface/tweet';

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
	
	constructor(private service: UserService, private tweetService: TweetService) { }
	
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

	}

}
