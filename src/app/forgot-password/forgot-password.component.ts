import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    faCalendar = faCalendar;
    constructor() { }

    ngOnInit(): void {
    }

    onSubmit(f: NgForm) {
        console.log(f);
    }
}
