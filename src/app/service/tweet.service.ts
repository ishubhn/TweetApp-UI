import { Tweet } from './../interface/tweet';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TweetService {

	private REST_SERVICE_URI = "http://localhost:8082/api/v1.0/tweets"
	private tweets: Observable<Tweet[]>;

	constructor(private http: HttpClient) { }

	getAllTweets() {
		return this.http.get<Tweet[]>(`${this.REST_SERVICE_URI}/all`);
	}

	postTweet(email: any, params: HttpParams) {
		return this.http.post(`${this.REST_SERVICE_URI}/${email}/add`,params);
	}

	likeTweet(email: any, tweetId: number) {
		return this.http.put(`${this.REST_SERVICE_URI}/${email}/like/${tweetId}`,{});
	}
}
