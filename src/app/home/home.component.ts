import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	subscription: any;

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.wait(5000);
	}

	wait = (delay: number) => {
		this.subscription = timer(delay).subscribe(() => {
			this.router.navigate(['/login']);
		})
	};
}
