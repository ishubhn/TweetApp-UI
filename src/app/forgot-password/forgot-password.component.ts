import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service'
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

export class UpdateUser {
    password: String;
    newPassword: String;
    dateOfBirth: String;
}

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    @ViewChild('f', { static: false })
    updatePasswordForm: NgForm;
    faCalendar = faCalendar;
    userEmail: String;
    isUpdatePasswordSuccess: boolean = false;
    errorMessage: any;
    subscription: any;

    user: UpdateUser = {
        password: "",
        newPassword: "",
        dateOfBirth: ""
    }

    constructor(private service: UserService, private router: Router) { }

    ngOnInit(): void {
    }

    // parse date as per dd/mm/yyyy
    parseDate = (dateBirth: any) => {
        let day = dateBirth.day;
        let month = dateBirth.month;
        let year = dateBirth.year;
        let finalDate: String;

        if (month < 10 && day < 10) {
            finalDate = `0${day}/0${month}/${year}`;
        } else if (month < 10 && day > 9) {
            finalDate = `${day}/0${month}/${year}`;
        } else if (day < 10 && month > 9) {
            finalDate = `0${day}/${month}/${year}`;
        } else {
            finalDate = `${day}/${month}/${year}`;
        }

        return finalDate;
    }

    onSubmit = (f: NgForm) => {
        this.userEmail = this.updatePasswordForm.value.emailId;
        this.user.password = this.updatePasswordForm.value.password;
        this.user.newPassword = this.updatePasswordForm.value.newPassword;
        this.user.dateOfBirth = this.parseDate(this.updatePasswordForm.value.dateOfBirth);

        this.service.forgotPassword(this.userEmail, this.user).subscribe(
            responseData => {
                console.log(responseData);
                console.log("Success")
                this.isUpdatePasswordSuccess = true;
                this.wait(3000);
            },
            err => {
                this.errorMessage = err.error.message;
                console.error("Error");
                console.error(this.errorMessage);
            }
        )
    }

    wait = (delay: number) => {
        this.subscription = timer(delay).subscribe(() => {
            this.router.navigate(['/login']);
        })
    };

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
