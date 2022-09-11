import { HttpParams } from '@angular/common/http';
import { TweetService } from './../service/tweet.service';
import { Router } from '@angular/router';
import { UserComponent } from './../user/user.component';
import { Tweet } from './../interface/tweet';
import { NgForm, NgModel } from '@angular/forms';
import { faHeart, faReply, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-tweetByUser',
  templateUrl: './tweet-by-user.component.html',
  styleUrls: ['./tweet-by-user.component.css']
})
export class TweetByUserComponent implements OnInit {
  // Initialization
  faTwitter = faTwitter;
  faReply = faReply;
  faLike = faHeart;
  faLikeEmpty = farHeart;
  faDelete = faTrash;
  faUpdate = faPenToSquare;

  likeClass: string;
  replyClass: string;
  deleteClass: string;
  updateClass: string;

  isUpdate: boolean = false;
  isReplyBox: boolean = false;
  loggedInUser: string;
  tweetLength: number;
  user: any;

  @ViewChild('f', { static: false })
  tweetUpdateForm: NgForm;

  @ViewChild('r', { static: false })
  replyForm: NgForm;

  @Input()
  tweet: Tweet;

  constructor(private service: UserService, private tweetService: TweetService,
    private parent: UserComponent, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('loginStatus') == 'true') {
      this.loggedInUser = String(localStorage.getItem("emailId"));
      this.service.findUserById(this.tweet.email).subscribe(
        (response) => {
          this.user = response;
        }
      );

    }
  }

  keydown(text: NgModel) {
    this.tweetLength = 144 - text.value.length;
  }

  toggleUpdate() {
    this.isUpdate = !this.isUpdate;
  }

  toggleReply() {
    this.isReplyBox = !this.isReplyBox;
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

  deleteTweet() {
    this.tweetService.deleteTweet(this.tweet.email, this.tweet.id).subscribe(
      (res) => {
        console.log('tweet deleted');
        this.parent.refreshPage();
      },
      (err) => {
        console.error("tweet delete error");
        console.error(err.error.message);
      }
    )
  }

  replyTweet(r: NgForm) {
    const params = new HttpParams()
      .set('body', this.replyForm.value.replyBody);

    this.tweetService.replyTweet(this.loggedInUser, this.tweet.id, params).subscribe(
      (res) => {
        console.log("Reply added to tweet");
        this.parent.refreshPage();
      },
      (err) => {

      }
    )
  }

  updateTweet(f: NgForm) {
    if (this.tweetUpdateForm.value.body !== null && this.tweetUpdateForm.value.body !== " ") {
      const params = new HttpParams()
        .set('body', this.tweetUpdateForm.value.body);

      this.tweetService.updateTweet(this.tweet.email, this.tweet.id, params)
        .subscribe(
          response => {
            console.log("Tweet updated successfully");
            console.warn(response);
            this.parent.refreshPage();
            this.tweetLength = 144;
          },
          err => {
            this.ngOnInit();
            console.error("Unable to update tweet");
            console.warn(err.error.message);
            console.warn(err.error);
          }
        );
    } else {
      console.error("Invalid tweet Content. Null Value");
    }
  }
}
