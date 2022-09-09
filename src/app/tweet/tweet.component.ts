import { Component, OnInit } from '@angular/core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';


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

	constructor() { }

	ngOnInit(): void {
	}

}
