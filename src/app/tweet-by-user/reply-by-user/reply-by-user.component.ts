import { UserService } from './../../service/user.service';
import { Reply } from './../../interface/reply';
import { UserData } from './../../interface/user-data';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-replyByUser',
  templateUrl: './reply-by-user.component.html',
  styleUrls: ['./reply-by-user.component.css']
})
export class ReplyByUserComponent implements OnInit {
  faTwitter = faTwitter;

  user: UserData;

  @Input()
  reply: Reply;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.findUserById(this.reply.email).subscribe(
      (res) => {
        this.user = res;
      }
    )
  }
}
