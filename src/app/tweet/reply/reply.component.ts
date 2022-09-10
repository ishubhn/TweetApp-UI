import { UserData } from './../../interface/user-data';
import { UserService } from './../../service/user.service';
import { Reply } from './../../interface/reply';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-reply',
	templateUrl: './reply.component.html',
	styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

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
