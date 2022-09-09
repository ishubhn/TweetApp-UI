import { Tweet } from './../interface/tweet';
import { HttpClient } from '@angular/common/http';
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
    // this.tweets = this.tweets = this.http.get<Tweet[]>("/courses.json").map(data => _.values(data)).do(console.log);
  }
}
